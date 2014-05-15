[![Build Status](https://travis-ci.org/devict/startupwichita.com.png)](https://travis-ci.org/devict/startupwichita.com)

# startupwichita.com
A community site for bringing connection and awareness to the Tech and Startup
Communities in Wichita, KS.

## Status
This site is currently under heavy production. The different components of the
application and their current state is outlined here. Components with a
checkmark (✓) are completed and components still needing work include a link to
their GitHub issue.


|Component           |User      |Tag       |Events    |Resource  |News      |
|--------------------|----------|----------|----------|----------|----------|
|UI                  |Multiple  |[#32][i32]|[#14][i14]|[#12][i12]|[#11][i11]|
|Angular Controller  |Multiple  |✓         |[#14][i14]|[#12][i12]|✓         |
|Angular Service     |[#08][i08]|✓         |✓         |✓         |✓         |
|Express Route       |✓         |✓         |✓         |✓         |✓         |
|Express Controller  |✓         |✓         |✓         |✓         |✓         |
|Mongoose Model      |✓         |✓         |✓         |✓         |✓         |

[i08]: <https://github.com/devict/startupwichita.com/pull/08>  "Issue 08"
[i11]: <https://github.com/devict/startupwichita.com/pull/11>  "Issue 11"
[i12]: <https://github.com/devict/startupwichita.com/pull/12>  "Issue 12"
[i14]: <https://github.com/devict/startupwichita.com/pull/14>  "Issue 14"
[i32]: <https://github.com/devict/startupwichita.com/pull/32>  "Issue 32"
[i46]: <https://github.com/devict/startupwichita.com/pull/46>  "Issue 46"

In addition to the previous components there are several other issues mostly
related to the overall UI and design of the site.

## Setup
You can run a copy of the site on a VM on your machine using VirtualBox and Vagrant.

### Installing VirtualBox
Download and run an installer from
[VirtualBox Downloads](https://www.virtualbox.org/wiki/Downloads).

### Installing Vagrant
Download and run an installer from
[Vagrant Downloads](http://www.vagrantup.com/downloads).

### Create and Provision the VM
For Mac and Linux run the following from the checkout of the project.

~~~bash
vagrant up                     # This can take 15 minutes depending on your
                               # machine and network
vagrant ssh                    # This will open a shell connection to your VM
cd /var/www/startupwichita.com # This will put you in the project directory
npm install                    # This can take another 5 minutes
grunt                          # This will run the default grunt task which
                               # will start the server
~~~

Wait until you see the line `Express app started on port 3000`. Leave that
terminal window open for as long as you want the server to be running. You can
type `rs` and Enter to restart the server.

In a web browser open `http://10.10.100.100:3000`.

## Contributing
To contribute to the development of startupwichita.com, please read the [guide
to contributing][contributing-doc].

## Attributions
This site is built on the [MEAN Stack](http://www.mean.io). Details of the
stack are outlined below.

--------------------------------------------------------------------------------

## MEAN Stack
MEAN is a boilerplate that provides a nice starting point for
[MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/),
[Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based
applications. It is designed to give you quick and organized way to start
developing of MEAN based web apps with useful modules like mongoose and
passport pre-bundled and configured. We mainly try to take care of the
connection points between existing popular frameworks and solve common
integration problems.

### Prerequisites
* Node.js
* MongoDB

#### Tools Prerequisites
* NPM - Node.js package manager
* Bower - Web package manager
* Grunt - Task Runner

### Additional Packages
* Express
* Mongoose
* Passport
* AngularJS
* Twitter Bootstrap
* UI Bootstrap

### Configuration
All configuration is specified in the [config](config/) folder, particularly
the [config.js](config/config.js) file and the [env](config/env/) files. Here
you will need to specify your application name, database name, as well as hook
up any social app keys if you want integration with Twitter, Facebook, GitHub
or Google.

#### Environmental Settings

There are three environments provided by default, __development__, __test__,
and __production__. Each of these environments has the following configuration
options:
* __db__ - This is the name of the MongoDB database to use, and is set by
  default to __mean-dev__ for the development environment.
* __app.name__ - This is the name of your app or website, and can be different
  for each environment. You can tell which environment you are running by
  looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google, Twitter. You can specify
  your own social application keys here for each platform:
    * __clientID__
    * __clientSecret__
    * __callbackURL__

To run with a different environment, just specify NODE_ENV as you call grunt:

    $ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

    $ NODE_ENV=test node server

> NOTE: Running Node.js applications in the __production__ environment enables
> caching, which is disabled by default in all other environments.

### Getting Started
  We pre-included an article example, check it out:
  * [The Model](app/models/article.js) - Where we define our object schema.
  * [The Controller](app/controllers/articles.js) - Where we take care of our
    backend logic.
  * [NodeJS Routes](app/routes) - Where we define our REST service routes.
  * [AngularJs Routes](public/js/config.js) - Where we define our CRUD routes.
  * [The AngularJs Service](public/js/services/articles.js) - Where we connect
    to our REST service.
  * [The AngularJs Controller](public/js/controllers/articles.js) - Where we
    take care of  our frontend logic.
  * [The AngularJs Views Folder](public/views/articles) - Where we keep our
    CRUD views.

### More Information
  * Visit us at [Linnovate.net](http://www.linnovate.net/).
  * Visit our [Ninja's Zone](http://www.meanleanstartupmachine.com/) for
    extended support.

### Credits
* Inspired by the great work of [Madhusudhan
  Srinivasa](https://github.com/madhums/)
* The MEAN name was coined by
  [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)
* MEAN could not be as great as it is without the contribution of the
  [following people](https://github.com/linnovate/mean/blob/master/AUTHORS).

### License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[contributing-doc]: https://github.com/devict/startupwichita.com/blob/master/CONTRIBUTING.md
