/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen } from "@testing-library/react";
import TrendingArticles from "@/components/TrendingArticles";
import { describe, expect, test, vi } from "vitest";
import { Timestamp } from "firebase/firestore";
import { ImageProps } from "next/image";

// Mock du composant "Newsletter"
vi.mock("./Newsletter", () => ({
  __esModule: true,
  default: () => <div>Newsletter</div>,
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: ImageProps) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

// Données simulées respectant le type DataType
const mockArticles = [
  {
    id: "1",
    title: "Test Article 1",
    description: "This is a description.",
    category: "Tech",
    image: "https://example.com/image1.jpg",
    authorName: "John Doe",
    authorPhoto: "https://example.com/johndoe.jpg",
    authorBio: "Lorem ipsum dolor sit amet.",
    authorJoinDate: "2021-01-01",
    authorId: "author-1",
    createdAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "2",
    title: "Test Article 2",
    description: "Another description.",
    category: "Gaming",
    image: "https://example.com/image2.jpg",
    authorName: "Jane Doe",
    authorPhoto: "https://example.com/janedoe.jpg",
    authorBio: "Consectetur adipiscing elit.",
    authorJoinDate: "2020-05-10",
    authorId: "author-2",
    createdAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "3",
    title: "Test Article 3",
    description: "Yet another description.",
    category: "Lifestyle",
    image: "https://example.com/image3.jpg",
    authorName: "Sam Smith",
    authorPhoto: "https://example.com/samsmith.jpg",
    authorBio: "Sed do eiusmod tempor incididunt.",
    authorJoinDate: "2019-11-22",
    authorId: "author-3",
    createdAt: Timestamp.fromDate(new Date()),
  },
];

describe("TrendingArticles", () => {
  test("renders trending articles correctly", () => {
    render(<TrendingArticles article={mockArticles} />);

    // Vérifier que les titres des articles sont affichés
    expect(screen.getByText("Test Article 1")).toBeInTheDocument();
    expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    expect(screen.getByText("Test Article 3")).toBeInTheDocument();

    // Vérifier que les images des articles sont bien affichées
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
    expect(images[0]).toHaveAttribute("src", "https://example.com/image1.jpg");

    // Vérifier que les catégories sont correctement affichées
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Gaming")).toBeInTheDocument();
    expect(screen.getByText("Lifestyle")).toBeInTheDocument();

    // Vérifier que les liens redirigent correctement vers les pages des articles
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
    expect(links[0]).toHaveAttribute("href", "/articles/1");
    expect(links[1]).toHaveAttribute("href", "/articles/2");
    expect(links[2]).toHaveAttribute("href", "/articles/3");

    // Vérifier que le composant Newsletter est rendu
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
  });
});
