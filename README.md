# Snip

CDK project for a basic HTMX application using Aurora DSQL as the primary data store.

## Useful commands

- `npm run start` starts the API locally on http://localhost:8080
- `npm run db:migrate` runs the schemaManager and all SQL migrations
- `npm run tsc` compile typescript
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## DSQL Migrations

Unfortunately Drizzle does not support [DSQL for their drizzle-kit migration system](https://github.com/drizzle-team/drizzle-orm/issues/1267#issuecomment-2530875854) so this project has a bespoke method for running migrations.

In `src/migrations` is a list of SQL files that the schemaManager function will bundle and attempt to execute. NOTE: only one SQL command per file is allowed or you may get some cryptic SQL errors back.

## Future Work

- [ ] add some kind of tests - Cypress maybe?
- [ ] ability to search across all your snips

### Nice-to-haves

- [ ] make sidebar have folder/file structure
