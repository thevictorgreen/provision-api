#!/bin/bash

# IMPORT SAMPLE DATA COLLECTIONS

set -eux

mongoimport --db provisioning --collection machines --file machines-sample.json
mongoimport --db provisioning --collection authorized_admins --file authorized-admins-sample.json

echo "Complete"
