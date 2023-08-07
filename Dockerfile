# Sử dụng base image node:alpine, phiên bản nhẹ nhất hỗ trợ Node.js
FROM node:16 as source

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục /app
COPY package*.json ./

# Cài đặt các thư viện và phụ thuộc từ package.json
RUN npm install

# Sao chép toàn bộ mã nguồn từ thư mục gốc vào /app trong container
COPY . .

# Thiết lập cổng mà ứng dụng sẽ lắng nghe
EXPOSE 4000

# Chạy lệnh để khởi động ứng dụng khi container được chạy
CMD [ "npm", "start" ]