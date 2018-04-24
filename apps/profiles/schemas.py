from graphene_django import DjangoObjectType
import graphene

from .models import Privacy as PrivacyModel

class Privacy(DjangoObjectType):
    class Meta:
        model = PrivacyModel

class Query(graphene.ObjectType):
    users = graphene.List(Privacy)

    def resolve_privacys(self, info):
        return PrivacyModel.objects.all()

PrivacySchema = graphene.Schema(query=Query)s