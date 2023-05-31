FROM registry.cn-hangzhou.aliyuncs.com/mse-spring-cloud-alibaba/spring-cloud-alibaba-docsite-base:v1

WORKDIR /spring-cloud-alibaba

COPY . .

RUN docsite build

ENTRYPOINT ["python", "-m", "SimpleHTTPServer", "8080"]