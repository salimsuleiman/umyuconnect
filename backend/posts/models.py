from django.db import models
from accounts.models import User

class Post(models.Model):
    author = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    text = models.TextField(blank=False, null=False, max_length=280)
    date_created = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User,  related_name='liked_posts', blank=True)
    def __str__(
        self) -> str: return str(self.id) + self.text[:20] + '..' +  ' | comments ' + str(self.comments.count())  + ' | likes ' +  str(self.likes.count() )



class Comment(models.Model):
    author = models.ForeignKey(
        User, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField(blank=False, null=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'[{self.text[:12]}.....]'


