import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "brainlab",
  title: "Brain Lab — CMS",
  projectId: "ce5l21o8",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: "/studio",
});
