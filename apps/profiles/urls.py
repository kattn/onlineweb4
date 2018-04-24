# -*- encoding: utf-8 -*-

from django.conf.urls import url
from apps.api.utils import SharedAPIRootRouter
from apps.profiles import views

urlpatterns = [
    url(r'^$', views.index, name='profiles'),
    url(r'^(\d+)/$', views.index, name='profiles_details'),
    url(r'^search/$', views.index, name='profiles_details')
]

# API v1
router = SharedAPIRootRouter()
router.register(r'profiles', views.PrivacyViewSet, base_name='profiles')
