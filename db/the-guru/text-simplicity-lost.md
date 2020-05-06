Originally, the beauty of commands was in being predictable, readable, and
not causing surprises. UNIX style operating systems, are well thought out.
But, people will cram a lot more than they should, and it gets out of
control, here is a mild example of mixing some video files with the ffmpeg
command.

ffmpeg -i test1.avi -i test2.avi -vcodec copy -acodec copy -vcodec copy
-acodec copy test12.avi -newvideo -newaudio

I have some guesses as to what the ff stands for. You can visit the manual
page here: [https://linux.die.net/man/1/ffmpeg][1]

[1]: https://linux.die.net/man/1/ffmpeg