import { CreateNewBody } from "@/app/home/components/types";

const API_URL = process.env.API;
const news = `${API_URL}/news`;
const headers = {
  "Content-Type": "application/json",
}

export async function getNews() {
  const res = await fetch(news, {
    method: "GET",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function createNew(body: CreateNewBody) {
  const res = await fetch(news, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.ok;
}

export async function updateNew(newId: number) {
  const res = await fetch(news + newId, {
    method: "PATCH",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function deleteNew(newId: number) {
  const res = await fetch(news + '/' + newId, {
    method: "DELETE",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

