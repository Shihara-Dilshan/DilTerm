#!/bin/bash
echo "
Linux Commands
===============

man   : Displays the manual of any command
cal   : Displays the calendar of the current month
date  : displays the current date and time

~       : home of the current user
pwd     : present working directory
history : 

File System
============

mkdir : make directory
mv    : move/rename
cp    : copy
rmdir : remove directory

ls  : list all files in the current directory
  -l  : long listing
  -a  : all files (includes hidden files and folders)
  -r  : reverse order
  -t  : sorts according to user modified time

cd  : change directory
  ..  : up one level directory
  .   : change to the current directory (no change, basically)

rm  : remove file
  -r  : recursive delete
  -f  : force delete (ignore all the warnings)

Note: Never use "rm -rf /". It removes the whole Linux FileSystem without giving any warnings.

touch   : creates a new file if does not exist or changes the modified time to current time
echo    : Used to print a message to the terminal
cat     : Concatenates one or more files and prints them in the terminal (by default)
printf  : Used to print a message to the terminal
nano    : Opens the file or creates a new file in nano editor
wc      : Word Count. Prints the number of lines, words and byte count of a file



Navigation
===========

more  : Used to display file but can only navigate in one direction (forward). No backward movement allowed.
less  : Used to display file and it allows both forward and backward movement. This is used most often.
most  : All the features of less plus some more.
head  : Displays head (starting lines) of a file (by default 10 lines).
tail  : Displays tail (ending lines) of a file (by default 10 lines).


file  : Used to determine the type of file.
diff  : Used to see differences between two files.
tee   : Used to print the standard output in terminal as well as save it in a file.


grep  : Global search a Regular Expression and Print.
fg    : Brings all the background processes in the foreground.


which   : Locate a command in FileSystem
type    : displays the type of linux command
help    : displays help of the command
tar     : Used to create/extract tarballs
ps      : Displays the snapshot of the current running processes
top     : display linux processes
kill    : sends kill signal to a process
du      : estimate file disk usage(recursively calculates for each file in the curent directory)
fdisk
fsck

SPECIAL THANKS TO shubhambhattar FOR CREATING THESE AWESOME TEXT FILE THAT CONTAINS SOME USEFULL LINUX COMMANDS.
https://gist.github.com/shubhambhattar/53059f08da48ea69d87ac1e62dd4d7ff
"
  
