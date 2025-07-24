CREATE UNIQUE INDEX ASYNC snippet_unique_index ON snippet USING btree_index (author, full_path);
