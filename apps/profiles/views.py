# -*- coding: utf-8 -*-
import json
import logging
import re
import uuid
from smtplib import SMTPException

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.models import Group
from django.core.mail import send_mail
from django.db import IntegrityError
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.utils.translation import ugettext as _
from django.views import View
from googleapiclient.errors import HttpError
from oauth2_provider.models import AccessToken
from watson import search as watson

from apps.approval.forms import FieldOfStudyApplicationForm
from apps.approval.models import MembershipApproval
from apps.authentication.forms import NewEmailForm
from apps.authentication.models import OnlineUser as User
from apps.authentication.models import Email, Position, RegisterToken
from apps.authentication.utils import create_online_mail_alias
from apps.dashboard.tools import has_access
from apps.gsuite.accounts.main import create_g_suite_account, reset_password_g_suite_account
from apps.marks.models import Mark, Suspension
from apps.payment.models import PaymentDelay, PaymentRelation, PaymentTransaction
from apps.profiles.forms import InternalServicesForm, PositionForm, PrivacyForm, ProfileForm
from apps.profiles.models import Privacy
from apps.shop.models import Order
from utils.shortcuts import render_json

# API v1
from rest_framework import mixins, viewsets, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from apps.profiles.serializers import ProfileSerializer

logger = logging.getLogger(__name__)

"""
Index for the entire user profile view
Methods redirect to this view on save
"""

def index(request, id=None):
    return render(request, 'profiles/index.html')

class GSuiteCreateAccount(View):
    def post(self, request, *args, **kwargs):

        try:
            create_g_suite_account(request.user)
            messages.success(request,
                             "Opprettet en G Suite konto til deg. Sjekk primærepostadressen din ({}) for instruksjoner."
                             .format(request.user.get_email().email))
        except HttpError as err:
            if err.resp.status == 409:
                messages.error(request, 'Det finnes allerede en brukerkonto med dette brukernavnet i G Suite. '
                               'Dersom du mener det er galt, ta kontakt med dotkom.')
            else:
                messages.error(request, 'Noe gikk galt. Vennligst ta kontakt med dotkom.')

        return redirect('profile_add_email')


class GSuiteResetPassword(View):
    def post(self, request, *args, **kwargs):
        try:
            reset_password_g_suite_account(request.user)
            messages.success(request, "Du har fått satt et nytt passord. Sjekk primæreposten din for informasjon.")
        except ValueError as err:
            messages.error(request, err)

        return redirect('profile_add_email')

class PrivacyViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.ListModelMixin):
    pass
    lookup_field = 'pk'
    serializer_class = ProfileSerializer

    def get_queryset(self):
        logger.debug(self.request.user)
        user = self.request.user
        queryset = [User.objects.get(username=user.username)]
        return queryset
