from django.db import models

class SampleData(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    favourite_color = models.CharField(max_length=7)  # Stores hex color codes like "#ff0000"

    def str(self):
        return self.name 