use sha2::{Digest, Sha256};
use std::fs::File;
use std::io::{Write, Read};
use serde_json;

#[derive(Debug)]
struct Sale {
    product_id: u64,
    amount: f64,
    timestamp: String,
    // Other relevant data for an e-commerce sale
}

struct Block {
    sales: Vec<Sale>,
    prev_hash: String,
    nonce: u64,
    creator: String,
}

impl Block {
    fn new(sales: Vec<Sale>, prev_hash: String, creator: String) -> Self {
        Block {
            sales,
            prev_hash,
            nonce: 0,
            creator,
        }
    }

    fn calculate_hash(&self) -> String {
        let mut hasher = Sha256::new();
        let sales_str: String = self
            .sales
            .iter()
            .map(|sale| format!("{:?}", sale))
            .collect::<Vec<String>>()
            .join("");
        hasher.update(format!(
            "{}{}{}{}",
            sales_str, self.prev_hash, self.nonce, self.creator
        ));
        format!("{:x}", hasher.finalize())
    }

    fn mine_block(&mut self, difficulty: usize) {
        let prefix = "0".repeat(difficulty);
        while !self.calculate_hash().starts_with(&prefix) {
            self.nonce += 1;
        }
        println!("Block mined: {}", self.calculate_hash());
    }
}

struct Blockchain {
    chain: Vec<Block>,
    pending_sales: Vec<Sale>,
    difficulty: usize,
    validators: Vec<String>,
}

impl Blockchain {
    fn new() -> Self {
        Blockchain {
            chain: vec![Block::new(vec![], "0".to_string(), "Genesis".to_string())],
            pending_sales: vec![],
            difficulty: 4,
            validators: vec!["Validator1".to_string(), "Validator2".to_string()],
        }
    }

    fn add_sale(&mut self, sale: Sale) {
        self.pending_sales.push(sale);
    }

    fn create_block(&mut self, creator: String) {
        if self.validators.contains(&creator) {
            let block = Block::new(
                self.pending_sales.clone(),
                self.get_latest_block().calculate_hash(),
                creator,
            );
            block.mine_block(self.difficulty);
            self.chain.push(block);
            self.pending_sales.clear();
        } else {
            println!("Unauthorized creator: {}", creator);
        }
    }

    fn get_latest_block(&self) -> &Block {
        self.chain.last().unwrap()
    }
}

impl Blockchain {
    fn save_blockchain_to_file(&self, filename: &str) {
        let data = serde_json::to_string(&self.chain).unwrap();

        let mut file = File::create(filename).expect("Unable to create file to save blockchain!");
        file.write_all(data.as_bytes()).expect("Error writing to file!");
    }

    fn load_blockchain_from_file(&mut self, filename: &str) {
        let mut file = File::open(filename).expect("Unable to open file to load blockchain!");
        let mut contents = String::new();
        file.read_to_string(&mut contents).expect("Error reading file!");

        if let Ok(chain) = serde_json::from_str::<Vec<Block>>(&contents) {
            self.chain = chain;
        } else {
            println!("Failed to load file blockchain!");
        }
    }
}

fn main() {
    let mut blockchain = Blockchain::new();

    // Adding pending sales
    blockchain.add_sale(Sale {
        product_id: 1,
        amount: 99.99,
        timestamp: "2023-12-01T12:00:00".to_string(),
    });
    blockchain.add_sale(Sale {
        product_id: 2,
        amount: 49.99,
        timestamp: "2023-12-01T13:00:00".to_string(),
    });

    // Creating a new block as Validator1
    blockchain.create_block("Validator1".to_string());
}

fn validate_transaction(&self, transaction: &Sale) -> bool {
    // Simplified implementation: validation if the sale has a positive value
    transaction.amount > 0.0
}

    // Saving the blockchain to a file
    blockchain.save_blockchain_to_file("blockchain_data.json");

    // Reading the blockchain from a file
    let mut new_blockchain = Blockchain::new();
    new_blockchain.load_blockchain_from_file("blockchain_data.json");

    // Printing the blockchain loaded from the file
    println!("Blockchain loaded from file:");
    for block in new_blockchain.chain.iter() {
        println!("{:?}", block);
    }
