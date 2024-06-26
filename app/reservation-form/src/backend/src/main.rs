use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use actix_cors::Cors; // CORSを追加
use serde::{Deserialize, Serialize};

// アドレスとポートの設定
const SERVER_ADDR: &str = "127.0.0.1:8080";

// InputDataの型指定
#[derive(Debug, Deserialize, Serialize)]
struct InputData {
    username: String,
    affiliation_year: String,
    mail_address: String,
    phone_number: String,
    message: String,
}

// submit 関数で受け取ったデータを処理する関数を追加
async fn submit(form: web::Json<InputData>) -> impl Responder {
    println!("Received form data: {:?}", form);
    // ここでデータを処理
    HttpResponse::Ok().json(form.0) // 受け取ったデータをそのまま返す
}

// main 関数を修正
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("[SERVER] http://{}/", SERVER_ADDR);

    HttpServer::new(|| {
        // CORSの設定を追加
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors) // CORSを適用
            .service(web::resource("/submit").route(web::post().to(submit)))
    })
    .bind(SERVER_ADDR)?
    .run()
    .await
}