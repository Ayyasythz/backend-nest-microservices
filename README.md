# REPO FOR LEARN MICROSERVICES WITH NEST JS

### **Tech Stack Recap**

- **API Gateway (Optional)**: Nginx, Traefik, Kong for routing HTTP requests.
- **Backend (Microservices)**:
    - **NestJS**: Framework for building microservices.
    - **gRPC**: For fast, low-latency, synchronous communication between services.
    - **RabbitMQ**: For asynchronous, event-driven communication.
    - **PostgreSQL**: For relational database (e.g., storing user data, orders, products).
    - **Redis**: For caching (e.g., storing cart items).
    - **Stripe/PayPal API**: For processing payments.

### **a) Auth Service (Authentication)**

- **Role**: Handles user registration, login, and JWT-based authentication.
- **Tech Stack**: NestJS, gRPC, PostgreSQL, JWT, bcrypt.
- **Communication**:
    - **HTTP**: Exposes REST endpoints for login and registration.
    - **gRPC**: Provides authentication and token validation to other microservices (like **Order Service**, **Cart Service**).

**Endpoints** (for HTTP):

- `/auth/login`: Logs in and returns JWT.
- `/auth/register`: Registers a new user.

**gRPC Methods**:

- `AuthenticateUser`: Authenticates user for other services.
- `ValidateToken`: Validates JWT for service-to-service communication.

### **b) Product Service**

- **Role**: Handles product-related operations such as CRUD (Create, Read, Update, Delete) for products.
- **Tech Stack**: NestJS, gRPC, PostgreSQL, TypeORM.
- **Communication**:
    - **HTTP**: Exposes REST endpoints to retrieve product data.
    - **gRPC**: Provides methods to fetch product details to other services like **Cart Service** and **Order Service**.

**Endpoints** (for HTTP):

- `/products`: Fetch all products.
- `/products/{id}`: Fetch product by ID.

**gRPC Methods**:

- `GetProductById`: Fetch a single product by ID.
- `GetAllProducts`: Fetch all products.
- `CreateProduct`: Add a new product.
- `UpdateProduct`: Update product details.
- `DeleteProduct`: Delete a product.

### **c) Cart Service**

- **Role**: Manages user shopping cart (add/remove products, update quantity).
- **Tech Stack**: NestJS, gRPC, Redis (for caching cart items).
- **Communication**:
    - **HTTP**: Exposes REST endpoints to interact with the cart.
    - **gRPC**: Fetch product details and verify stock with **Product Service**.

**Endpoints** (for HTTP):

- `/cart`: Get, add, or remove items from the cart.

**gRPC Methods**:

- `AddItemToCart`: Adds an item to the user's cart.
- `RemoveItemFromCart`: Removes an item from the cart.
- `GetCartForUser`: Retrieves the cart for the user.

### **d) Order Service**

- **Role**: Handles order creation, status updates, and order history.
- **Tech Stack**: NestJS, gRPC, MongoDB, TypeORM.
- **Communication**:
    - **HTTP**: Exposes REST endpoints to place and view orders.
    - **gRPC**: Communicates with **Product Service** to verify product availability and **Payment Service** to process payments.
    - **RabbitMQ**: Sends events like `OrderCreated`, `PaymentSuccessful`, etc., to trigger downstream actions (like inventory updates or shipping).

**Endpoints** (for HTTP):

- `/orders`: Create new order.
- `/orders/{id}`: Fetch order details by ID.

**gRPC Methods**:

- `CreateOrder`: Creates an order and initiates payment processing.
- `GetOrderById`: Retrieves order details.
- `UpdateOrderStatus`: Updates the order status (e.g., pending, completed).

**RabbitMQ** Events:

- **OrderCreated**: Sends this event to RabbitMQ when an order is created.
- **PaymentSuccessful**: Listens to this event to confirm successful payment and update order status.
- **OrderShipped**: Sends this event after the order is shipped.

### **e) Payment Service**

- **Role**: Processes payments and updates order status accordingly.
- **Tech Stack**: NestJS, gRPC, Stripe/PayPal API.
- **Communication**:
    - **HTTP**: Exposes REST endpoints for processing payments.
    - **gRPC**: Communicates with **Order Service** to process payments.
    - **RabbitMQ**: Sends payment-related events like `PaymentProcessed` and `PaymentFailed` to trigger actions in other services.

**Endpoints** (for HTTP):

- `/payment/charge`: Process payment for an order.

**gRPC Methods**:

- `ProcessPayment`: Processes the payment for the order.
- `VerifyPaymentStatus`: Verifies payment status for an order.

**RabbitMQ** Events:

- **PaymentProcessed**: Sends this event to RabbitMQ after a successful payment to update order status.
- **PaymentFailed**: Sends this event when payment fails to notify **Order Service** for retry logic.
