### Kafka UI using JS

Build and Run

```bash
docker built -t  kafka-monitor-util:1.0.0 .
# Run On your laptop
docker run --rm -p 3000:3000 kafka-monitor-util:1.0.0

```

    Navigate to - http://localhost:3000/
    (Assuming there is no security involved)
    Fill in the  Kafka broker URL -> Click Connect
