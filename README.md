## graphql-post app 
Post-comment app which utilizes GraphQL queries for creation, listing, etc

## Setup

# clone git code
git clone https://github.com/teatm/graphql-post.git

# install the package
cd graphql-post
npm install

# create .env from .env.sample with database setting

# migrate database schema 
npx prisma migrate dev

# run development server
npm run dev

# (optional) run prisma studio
npx prisma studio

(optional) access apollo studio
http://localhost:3000/api/graphql
