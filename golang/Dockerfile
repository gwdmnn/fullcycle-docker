FROM golang:1.23.3-alpine AS builder
WORKDIR /usr/src/hello
COPY hello /usr/src/hello/
RUN go build -ldflags '-s -w' .

FROM scratch
WORKDIR /usr/src/hello
COPY --from=builder /usr/src/hello .
CMD ["./hello"]
