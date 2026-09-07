#!/usr/bin/env python3
"""Provide stats about Nginx logs stored in MongoDB."""

from pymongo import MongoClient


def main():
    """Print statistics about Nginx logs."""
    client = MongoClient('mongodb://127.0.0.1:27017')
    collection = client.logs.nginx

    print("{} logs".format(collection.count_documents({})))
    print("Methods:")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

    for method in methods:
        count = collection.count_documents({"method": method})
        print("\tmethod {}: {}".format(method, count))

    status_check = collection.count_documents({
        "method": "GET",
        "path": "/status"
    })

    print("{} status check".format(status_check))


if __name__ == "__main__":
    main()
