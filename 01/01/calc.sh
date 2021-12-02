#!/usr/bin/env bash

i=0

previous=-1
for number in $(cat input.txt); do
    if [ $previous != -1 ]; then
        if [ $number -gt $previous ]; then
            i=$((i+1))
        fi
    fi

    previous=$number
done

echo $i
