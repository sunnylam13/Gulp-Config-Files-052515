# Gulp Config Files

This is the latest version of my current Gulp development setup.

It's provided here to help fellow and new developers make the leap from GUI pre-compilers like Prepros to command line.

# Why Use Gulp Over GUI Compilers?

There are several advantages...

* Extremely powerful customization -- you can design a setup to suit your specific style or project.  (It's like having an app for almost everything.)
* Large and long term community support. (New plugins are designed often and are easily available.)
* Avoid RAM hogging, frozen precompiler issues that require you to force quit.  (With Terminal you simply cut off the problem with a single keystroke command of Ctrl+C)

# How to Use These Files

Simply use it as a reference or guide about how to setup a basic Gulp system that will process SASS/SCSS, Jade/HTML and Javascript.

This setup uses Browser Sync and is written with the "server" task so that ANY change to SCSS/SASS files, Jade/HTML files or Javascript files causes your previewed web page to reload.

Browser Sync displays your previewed web site by default at `localhost: 3000`.

Note that `*.scss`, `*.jade`, `*.html` uses a wildcard `*` to say, "Look for *any* file with that extension."

**NOTE**:  If you don't use the Node templating language Jade, simply comment out or delete any mentions of Jade in the Gulp file.