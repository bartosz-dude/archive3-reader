Search is separated into two parts in relation to the [[Work Search Query|query]], `anyField` is the search text and the rest of properties are the search filters.

## Search Session

When doing a new query, then a search session is created. During a search session any changes to the filters are treated as an update to the session, but change to the search text creates a new search session. Results page is session Independent.
## Search History

Each search session is saved in a session table. That db is used as the search history. Each entry has a date of last access. Page property is not saved.

| id     | date   | saved_search_id | query          |
| ------ | ------ | --------------- | -------------- |
| number | string | number \| null  | string \| null |
- Either `saved_search_id` or `query` must be present.
- Query is stored as json string.
- date is stored as ISO string
## Text-less Search

Search can be performed without a search text, with filters alone. Changes to the fandoms will create a new search session.

## Search Box Content

Normally the search box contains the search string, but in case of text-less search it will contain one of these values, depending which is present, going from top first.

- `titles`
- `fandoms`
- `characters`
- `relationships`
- `additionalTags`
- "filtered works"

Fandoms and tags inside the search box will be displayed inside their tag box.

## Saved Searches

A search query can be saved as a saved search. It will be stored in separate saved searches table from search sessions. In the sessions db it will be a reference. The reference will behave the same in regards of search history. 

When opening a saved search from history and the query is modified it will create a new session. In saved searches view there will be an option to modify the query, this will not create a new session.

| id     | query  |
| ------ | ------ |
| number | string |
Query is stored as json string.

## Caching

Last query is cached with all the pages of results in search cache table.

| id     | session_id | page   | results |
| ------ | ---------- | ------ | ------- |
| number | number     | number | string  |
Results are stored as json string.