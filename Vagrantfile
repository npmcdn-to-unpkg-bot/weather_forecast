# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure('2') do |config|
  config.vm.box      = 'ubuntu/trusty64'

  config.vm.network :forwarded_port, guest: 3000, host: 3000

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 2
  end

  config.vm.provision "fix-no-tty", type: "shell" do |s|
    s.privileged = false
    s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
  end

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe 'apt'
    chef.add_recipe 'nodejs'
    chef.add_recipe 'ruby_build'
    chef.add_recipe 'rbenv::user'
    chef.add_recipe 'mysql::server'
    chef.add_recipe 'mysql::client'

    chef.json = {
        :rbenv => {
            :user_installs => [
                {
                    :user   => "vagrant",
                    :rubies => [
                        "2.1.5"
                    ],
                    :global => "2.1.5",
                    :gems => {
                        "2.1.5" => [
                            { name: "bundler" }
                        ]
                    }
                }
            ]
        },
        :git   => {
            :prefix => "/usr/local"
        },

        :mysql => {
            :server_root_password   => "root",
        }

    }
  end

end