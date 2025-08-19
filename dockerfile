# Use PHP 7.4 with Apache
FROM php:7.4-apache

# Set working directory
WORKDIR /var/www/html/

# Install system packages and PHP extensions MYSQL VERSION
RUN apt-get update && apt-get install -y \
    bash \
    nano \
    iputils-ping \
    default-mysql-client \
    libmariadb-dev \
    openssh-server \
    supervisor \
 && docker-php-ext-install mysqli pdo_mysql bcmath \
 && a2enmod rewrite headers \
 && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf \
 && rm -rf /var/lib/apt/lists/*

# Create html directory and set proper permissions for chroot
RUN mkdir -p /var/www/html/ /var/www/html/ \
    && chown root:root /var/www/html \
    && chmod 755 /var/www/html \
    && chmod 775 /var/www/html/

# Copy application files
COPY . /var/www/html/

# Set file ownership and permissions
RUN chmod ug+rw /var/www/html

# Copy Supervisor configuration
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Setup SSH and SFTP user
RUN mkdir -p /var/run/sshd \
 && useradd -m ftpuser && echo 'ftpuser:ftppass' | chpasswd

# Force chroot jail for ftpuser
RUN echo "Match User ftpuser\n\
    ChrootDirectory /var/www/html\n\
    ForceCommand internal-sftp\n\
    X11Forwarding no\n\
    AllowTcpForwarding no" >> /etc/ssh/sshd_config

# Expose Apache and SSH ports
EXPOSE 80 22

# Copy custom php.ini to enable output buffering
# COPY docker_php.ini /usr/local/etc/php/conf.d/php_custon_defined_config.ini

# Start all services with Supervisor
CMD ["/usr/bin/supervisord"]
