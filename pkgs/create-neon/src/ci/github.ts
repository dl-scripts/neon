import handlebars from "handlebars";
import { CI } from "../ci.js";
import path from "node:path";

const TEMPLATES: Record<string, string> = {
  "setup.yml.hbs": path.join(".github", "actions", "setup", "action.yml"),
  ".env.hbs": path.join(".github", ".env"),
  "build.yml.hbs": path.join(".github", "workflows", "build.yml"),
  "comments.yml.hbs": path.join(".github", "workflows", "comments.yml"),
  "release.yml.hbs": path.join(".github", "workflows", "release.yml"),
  "test.yml.hbs": path.join(".github", "workflows", "test.yml"),
};

function githubDelegate(
  this: any,
  options: handlebars.HelperOptions
): handlebars.SafeString {
  return new handlebars.SafeString("${{" + options.fn(this) + "}}");
}

export class GitHub implements CI {
  constructor() {}

  readonly type: string = "github";

  templates(): Record<string, string> {
    return TEMPLATES;
  }

  setup(): void {
    handlebars.registerHelper("$", githubDelegate);
  }
}
