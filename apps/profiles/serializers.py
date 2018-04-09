from apps.authentication.models import OnlineUser as User
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'url',
            'username',
            'email',
            'groups',
            'field_of_study',
            'started_date',
            'compiled',
            'infomail',
            'jobmail',
            'online_mail',
            'phone_number',
            'address',
            'zip_code',
            'allergies',
            'mark_rules',
            'rfid',
            'nickname',
            'website',
            'github',
            'linkedin',
            'gender',
            'bio',
            'saldo',
            'ntnu_username'
        )
