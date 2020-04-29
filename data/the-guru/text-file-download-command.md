Some commands are so good at what they do there is only a couple of them
[wget][1] and [curl][2] are a good example of that. cURL downloads files
really well, it is also very frequently used for debugging or testing
web-servers that serve files, it is a very efficient program. wget is
awesome at resuming downloads and downloading large files, it actually has
a feature that not only downloads a web page, but also all the images and
other web pages that are linked to it.

There are also some really eyebrow raising commands like [youtube-dl][3]
which comes with an --extract-audio argument, meaning, it will make an mp3
out of a video.

I don't know what Alphabet's Terms of Service state on the subject of
downloading their data. I don't recommend you use this command, unless you
familiarize yourself with their Terms of Service, specifics of downloading
content with third-party tools, and own the content yourself. Note that it
is not just a YouTube account that may get suspended, but all the rest too,
gmail and google docs, stuff on your android phone, etc.

Here is what the command would look for a YouTube Creator hoping to make a
backup of a particular video.

youtube-dl https://www.youtube.com/watch?v=YOUR\_VIDEO\_ID

And here is the code for saving just the audio it self, this is useful for
making an audio only version of an adventure video or remixing your content
in a song.

youtube-dl --extract-audio --audio-format mp3
https://www.youtube.com/watch?v=YOUR\_VIDEO\_ID

Look how simple and easy to read. Commands can save you from thousands of
mouse clicks and hours of annoying, repetitive work. Commands are a
beautiful invention. Graphic user interfaces are helpful when learning
computers, but eventually they will force you into a world of clicks.

[1]: http://man7.org/linux/man-pages/man1/wget.1.html
[2]: http://man7.org/linux/man-pages/man1/curl.1.html
[3]: https://github.com/ytdl-org/youtube-dl/blob/master/README.md