from apps.profiles.models import Privacy
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
