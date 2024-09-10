from rest_framework import serializers
from .models import *
from rest_framework.response import Response
from django.db.models import Sum

class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['image'] = instance.image.url

        return rep


class DestinationSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()

    def get_location(self, destination):
        l = Location.objects.get(id=destination.location_id)

        return l.name
    class Meta:
        model = Destination
        fields = ['id', 'name'] + ['location']


class PriceSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    def get_type(self, price):
        type = TypeOfTicket.objects.get(id=price.type_id)

        return type.name
    class Meta:
        model = Price
        fields = ['id'] + ['type'] + ['price']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['stars']


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['id', 'name', 'start_date', 'end_date', 'description']


class TourImageSerializer(ItemSerializer):
    class Meta:
        model = TourImage
        fields = ['id', 'name', 'image']

class TourDetailsSerializer(TourSerializer):
    destination = DestinationSerializer(many=True)
    remain_ticket = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    prices = serializers.SerializerMethodField()

    def get_remain_ticket(self, tour):
        price = Price.objects.filter(tour_id=tour.id)
        book = Booking.objects.filter(price__in=price).aggregate(Sum('quantity'))
        if book['quantity__sum']:
            return int(tour.quantity_ticket) - int(book['quantity__sum'])
        else:
            return tour.quantity_ticket

    def get_images(self, tour):
        tour_image = TourImage.objects.filter(tour_id=tour.id)

        return TourImageSerializer(tour_image, many=True).data

    def get_prices(self, tour):
        p = Price.objects.filter(tour_id=tour.id)

        return PriceSerializer(p, many=True).data


    class Meta:
        model = TourSerializer.Meta.model
        fields = TourSerializer.Meta.fields + ['destination'] + ['remain_ticket'] +['images'] + ['prices']


class TourRating(TourDetailsSerializer):
    rating = serializers.SerializerMethodField()

    def get_rating(self, tour):
        return tour.rating_set.filter(active=True).exists()

    class Meta:
        model = TourDetailsSerializer.Meta.model
        fields = TourDetailsSerializer.Meta.fields + ['rating']


class TourCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourCategory
        fields = ['id', 'name']


class NewsImageSerializer(ItemSerializer):
    class Meta:
        model = NewsImage
        fields = ['id', 'name', 'image']

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title', 'content']


class NewsDetailsSerializer(NewsSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, news):
        news_image = NewsImage.objects.filter(news_id=news.id)

        return NewsImageSerializer(news_image, many=True).data

    class Meta:
        model = NewsSerializer.Meta.model
        fields = NewsSerializer.Meta.fields + ['images']

class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ['id', 'name']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['active']



class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['avatar'] = instance.avatar.url

        return rep

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(data["password"])
        user.save()

        return user
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'avatar', 'email', 'is_superuser', 'is_staff']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class UserInfoSerializer(UserSerializer):
    info = serializers.SerializerMethodField()

    def get_info(self, user):
        if user.is_superuser == True:
            c = Admin.objects.get(user_id=user.id)
            return {'address': c.address, 'phone': c.phone}
        elif user.is_staff == True:
            c = Staff.objects.get(user_id=user.id)
            return {'address': c.address, 'phone': c.phone}
        else:
            c = Customer.objects.get(user_id=user.id)
            return {'address': c.address, 'phone': c.phone}

    class Meta:
        model = UserSerializer.Meta.model
        fields = UserSerializer.Meta.fields + ['info']



class CommentTourSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = CommentTour
        fields = ['id', 'updated_date', 'content', 'user', 'tour_id']


class CommentNewsSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = CommentNews
        fields = ['id', 'updated_date', 'content', 'user', 'news_id']


class BookingSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    tour_name = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    def get_tour_name(self, booking):
        price = Price.objects.get(id=booking.price_id)
        tour = Tour.objects.get(id=price.tour_id)
        return tour.name

    def get_total(self, booking):
        price = Price.objects.get(id=booking.price_id)
        return int(price.price) * int(booking.quantity)

    def get_type(self, booking):
        price = Price.objects.get(id=booking.price_id)
        type = TypeOfTicket.objects.get(id=price.type_id)

        return type.name
    class Meta:
        model = Booking
        fields = ['id', 'quantity'] + ['total'] + ['tour_name'] + ['type']














