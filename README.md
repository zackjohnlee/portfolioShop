bootstrapped with create-react-app,

this project is an attempt to integrate an artist portfolio with an online store.

e-commerce is powered by Stripe. We use AWS for hosting and Lambda for handling the interactions with the Stripe API. this is to help with security...also why not?

Stripe will also be used to keep track of inventory, so item information like price and stock levels will be pulled from the Stripe API and populated dynamically when a shop item is being viewed.

serverless is used to simplify the deployment of functions to Lambda.

artist portfolio work is handled by a custom data structure and file naming system. This could probably be replaced with a CMS if necessary.

also implemented lazy loading for images using LazyLoadComponent. I'm not 100% satisfied with this solution and something more effective could be implmented.