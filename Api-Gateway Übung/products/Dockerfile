FROM python:3.6
RUN pip install Flask
RUN pip install pymongo
RUN useradd -ms /bin/bash admin
USER admin
WORKDIR /app
COPY app /app
CMD ["python", "app.py"]