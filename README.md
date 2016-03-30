== README

Do the following steps to run the project in development mode

#### 1. Install Vagrant and Virtualbox

#### 2. Install following plugins
```
$ vagrant plugin install vagrant-librarian-chef
```

#### 2.a Init Vagrant Server via Virtualbox
```
$ vagrant up --provider virtualbox   # This will take a while the very first time, at least 15-30 minutes.
```

#### 3. Run the following commands
```
$ vagrant ssh
$ cd /vagrant
$ gem install bundle
$ gem install bundler
$ gem install rails
$ rbenv rehash
$ bundle install
```

#### 4. Create and prepare the database
```
$ echo "CREATE DATABASE forecast" | mysql -u root -p;
$ bundle exec rake db:schema:load
$ bundle exec rake db:seed
```

#### 5. Run the rails server
```
rails s -e development -p 3000 -b 0.0.0.0
```
