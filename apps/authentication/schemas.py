from graphene_django import DjangoObjectType
import graphene

from .models import OnlineUser as UserModel

class User(DjangoObjectType):
    class Meta:
        model = UserModel

class Query(graphene.ObjectType):
    users = graphene.List(User)

    def resolve_privacys(self, info):
        return UserModel.objects.all()

UserSchema = graphene.Schema(query=Query)