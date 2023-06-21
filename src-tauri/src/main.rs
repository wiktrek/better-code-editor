// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
async fn open_file(path: String) -> Result<String, ()> {
    let file = fs::read_to_string(path).expect("error while reading file");
    println!("I was invoked from JS! {:?}", file);
    Ok(file)
}
