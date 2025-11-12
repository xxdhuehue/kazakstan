#!/bin/bash

echo "analysing log files"
echo "=========================="
echo -e  "\nList of log files updated in last 24 hours"

ERROE_PATTERNS=("ERROR" "FATAL" "CRITICAL") 
SYS_LOG_FILE="system.log"
LOG_DIR = ""
REPORT_FILE = "/users/xiaxiaodong/report.txt"

LOG_FILES = $(find $LOG_DIR -name "*.log" -mtime -1)

for LOG_FILE in $LOG_FILES; do
    gerp "${ERROE_PATTERNS[0]}" application.log > "$REPORT_FILE"
    grep -c "${ERROE_PATTERNS[0]}" application.log
    ERROR_COUNT =$(grep -c "${ERROE_PATTERNS[1]}" application.log) 

    if [ "$ERROR_COUNT" -gt 10]; then
        echo -e "\n action required. too many errors"
    fi
done