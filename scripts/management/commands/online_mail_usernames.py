# -*- coding: utf-8 -*-

import pytz
import datetime

from django.contrib.auth.models import Group
from django.db.utils import IntegrityError
from django.core.management.base import NoArgsCommand, CommandError
from django.utils import timezone

from unidecode import unidecode

from apps.authentication.models import OnlineUser


class Command(NoArgsCommand):

    def handle_noargs(self, *args, **kwargs):
        # We only sync in members of the Komiteer group
        group = Group.objects.get(name = "Komiteer")
        # Fetch all users that do not currently have an alias
        nomail = group.user_set.filter(online_mail__isnull=True).order_by('id')
        # Find a list of all taken email aliases in the system already
        taken_mails = [u.online_mail for u in OnlineUser.objects.filter(online_mail__isnull=False)]

        for user in nomail:
            i = ''
            # Decode the full name of the user to plain ascii
            name = unidecode(user.get_full_name()).lower()

            # Users which lack mail or a name are not considered
            if not name or not email:
                continue

            while True:
                # Start with a suggestion that is only lower case name replaced spaces with dots
                suggestion = name.replace(" ", ".") + str(i)
                if suggestion not in taken_mails:
                    user.online_mail = suggestion
                    user.save()
                    break
                # If the alias already exists, append a number, starting with 2
                else:
                    i = i + 1 if i else 2

        # Then produce a list of "alias: email" for all users in Komiteer
        for user in group.user_set.all():
            if user.online_mail and user.email:
                print "%s: %s" % (user.online_mail, user.email)