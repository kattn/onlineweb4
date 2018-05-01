from apps.profiles.models import Privacy
from apps.authentication.models import OnlineUser as User
from apps.authentication.models import Position
from apps.authentication.models import SpecialPosition
from apps.authentication.models import Email

from rest_framework import serializers

class PrivacySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Privacy
        fields = (
            'visible_for_other_users',
            'expose_nickname',
            'expose_email',
            'expose_phone_number',
            'expose_address',
            'visible_as_attending_events',
        )

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('period', 'committee', 'position')

class SpecialPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialPosition
        fields = ('position', 'since_year')

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ('email', 'primary', 'verified')

class ProfileSerializer(serializers.ModelSerializer):
    privacy = PrivacySerializer()
    #emails = EmailSerializer()
    #special_positions = SpecialPositionSerializer()
    positions = PositionSerializer()

    class Meta:
        model = User
        fields = (
            'positions',
            #'special_positions',
            #'emails',
            'privacy',
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