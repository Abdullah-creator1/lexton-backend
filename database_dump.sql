-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) CHECK (role = 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Truckers Table
CREATE TABLE truckers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    company_legal_name VARCHAR(255),
    company_other_name VARCHAR(255),
    rating INT CHECK (rating BETWEEN 1 AND 10),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    cell VARCHAR(20),
    email_1 VARCHAR(255) UNIQUE NOT NULL,
    email_2 VARCHAR(255),
    accounting_email_3 VARCHAR(255),
    accounting_email_4 VARCHAR(255),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    city VARCHAR(100),
    group_department_port_terminal VARCHAR(255),
    address_1 TEXT,
    address_2 TEXT,
    dot_number VARCHAR(50),
    mc_number VARCHAR(50),
    tariff_number VARCHAR(50),
    website VARCHAR(255),
    status VARCHAR(50),
    scac_code VARCHAR(50),
    account VARCHAR(255),
    hazardous BOOLEAN DEFAULT FALSE,
    reefer BOOLEAN DEFAULT FALSE,
    customs_bonded BOOLEAN DEFAULT FALSE,
    over_weight BOOLEAN DEFAULT FALSE,
    full_truckload BOOLEAN DEFAULT FALSE,
    less_than_truckload BOOLEAN DEFAULT FALSE,
    container_drayage BOOLEAN DEFAULT FALSE,
    out_of_gauge BOOLEAN DEFAULT FALSE,
    iso_tanks BOOLEAN DEFAULT FALSE,
    trans_loading BOOLEAN DEFAULT FALSE,
    flatbed BOOLEAN DEFAULT FALSE,
    open_tops BOOLEAN DEFAULT FALSE,
    residential BOOLEAN DEFAULT FALSE,
    heavy_haul BOOLEAN DEFAULT FALSE,
    conestoga BOOLEAN DEFAULT FALSE,
    triaxles BOOLEAN DEFAULT FALSE,
    warehouse BOOLEAN DEFAULT FALSE,
    storage BOOLEAN DEFAULT FALSE,
    long_haul BOOLEAN DEFAULT FALSE,
    documentation BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers Table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    country VARCHAR(100),
    state VARCHAR(50),
    city VARCHAR(100),
    zip VARCHAR(20),
    documentation VARCHAR(100),
    file_path TEXT,
    contact_person VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_2 VARCHAR(255),
    cell VARCHAR(20),
    terms_net_days INT,
    penalty_percent DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Charges Table
CREATE TABLE charges (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    charge_code VARCHAR(50) UNIQUE NOT NULL,
    charge_name VARCHAR(255) NOT NULL,
    charge_type VARCHAR(50) CHECK (charge_type IN ('Accessorial', 'FTL', 'Additional', 'Service', 'Warehouse')) NOT NULL,
    charge_value DECIMAL(10,2) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Firm Codes Table
CREATE TABLE firm_codes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    state VARCHAR(100),
    phone VARCHAR(20) NOT NULL
);

-- Quotations Table
CREATE TABLE quotations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    terms VARCHAR(50) NOT NULL,
    dated DATE NOT NULL,
    expiry DATE NOT NULL,
    added_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rate Quotations Table
CREATE TABLE rate_quotations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    quotation_id INT REFERENCES quotations(id) ON DELETE CASCADE,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    term VARCHAR(50),
    validity DATE,
    description VARCHAR(255),
    region VARCHAR(255),
    special_instruction TEXT,
    remarks TEXT,
    clauses TEXT,
    pickup_location VARCHAR(255) NOT NULL,
    dropoff_location VARCHAR(255) NOT NULL,
    carrier VARCHAR(255),
    equipment VARCHAR(50),
    weight VARCHAR(50),
    transit_time VARCHAR(50),
    cargo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotation Charges Table
CREATE TABLE quotation_charges (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    quotation_id INT REFERENCES rate_quotations(id) ON DELETE CASCADE,
    charge_type VARCHAR(50) CHECK (charge_type IN ('Accessorial', 'FTL', 'Additional', 'Service', 'Warehouse')) NOT NULL,
    charge_value DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance Optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_truckers_user_id ON truckers(user_id);
CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_charges_user_id ON charges(user_id);
CREATE INDEX idx_firm_codes_user_id ON firm_codes(user_id);
CREATE INDEX idx_quotations_user_id ON quotations(user_id);
CREATE INDEX idx_rate_quotations_user_id ON rate_quotations(user_id);
CREATE INDEX idx_quotation_charges_user_id ON quotation_charges(user_id);
