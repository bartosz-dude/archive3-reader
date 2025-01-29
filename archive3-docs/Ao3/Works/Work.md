## Meta

Work's meta contain all works details like tags and stats.

Optional tags are not present in the html when works omits them.

---
### Rating

#required

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		<dt class="rating tags">Rating:</dt>
		<dd class="rating tags">
			<ul class="commas">
				<li>
					 <a class="tag" href="/tags/General%20Audiences/works">
						 General Audiences
					 </a> 
				<li>
				...
```

Possible ratings
- `Not Rated`
- `General Audiences`
- `Teen and Up Audiences`
- `Mature`
- `Explicit`

A work can only have one rating at a time.

---
### Archive Warning

#required

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="warning tags">
	        <a href="/tos_faq#tags">
	              Archive Warning
	        </a>
	        :
		</dt>
		<dd class="warning tags">
			<ul class="commas">
				<li>
					 <a class="tag" href="/tags/No%20Archive%20Warnings%20Apply/works">
						 No Archive Warnings Apply
					 </a>
				<li>
				...
```

Possible warning tags
- `Creator Chose Not To Use Archive Warnings`
- `Graphic Depictions Of Violence`
- `Major Character Death`
- `No Archive Warnings Apply`
- `Rape/Non-Con`
- `Underage Sex`

Work can have multiple warnings and has at least one.

Text `Archive Warning` changes to `Archive Warnings` when multiple warnings are present.

---
### Category

#optional

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="category tags">
	        Category:
		</dt>
		<dd class="category tags">
			<ul class="commas">
				<li>
					<a class="tag" href="/tags/Gen/works">
						Gen
					</a>
				<li>
				...
```

Possible categories
- `F/F`
- `F/M`
- `Gen`
- `M/M`
- `Multi`
- `Other`

Work can have multiple categories.

Text `Category` changes to `Categories` when multiple categories are present.

---
### Fandom

#required

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="fandom tags">
	        Fandom:
		</dt>
		<dd class="fandom tags">
			<ul class="commas">
				<li>
					<a class="tag" href="/tags/Miraculous%20Ladybug/works">
						Miraculous Ladybug
					</a>
				<li>
				...
```

Possible categories
- `F/F`
- `F/M`
- `Gen`
- `M/M`
- `Multi`
- `Other`

Work can have multiple fandoms, at least one is present.

Text `Fandom` changes to `Fandoms` when multiple fandoms are present.

---
### Relationship

#optional

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="relationship tags">
	        Relationship:
		</dt>
		<dd class="relationship tags">
			<ul class="commas">
				<li>
					<a class="tag" href="/tags/Adrien%20Agreste%20%7C%20Chat%20Noir*s*Marinette%20Dupain-Cheng%20%7C%20Ladybug/works">
						Adrien Agreste | Chat Noir/Marinette Dupain-Cheng | Ladybug
					</a>
				<li>
				...
```

Work can have multiple relationships.

Text `Relationship` changes to `Relationships` when multiple fandoms are present.

---
### Character

#optional

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="character tags">
	        Character:
		</dt>
		<dd class="character tags">
			<ul class="commas">
				<li>
					<a class="tag" href="/tags/Marinette%20Dupain-Cheng%20%7C%20Ladybug/works">
						Marinette Dupain-Cheng | Ladybug
					</a>
				<li>
				...
```

Work can have multiple characters.

Text `Character` changes to `Characters` when multiple fandoms are present.

---
### Additional tags

#optional

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="freeform tags">
	        Additional tag:
		</dt>
		<dd class="freeform tags">
			<ul class="commas">
				<li>
					<a class="tag" href="/tags/Marinette%20Dupain-Cheng%20%7C%20Ladybug/works">
						Marinette Dupain-Cheng | Ladybug
					</a>
				<li>
				...
```

Work can have multiple characters.

Text `Character` changes to `Characters` when multiple fandoms are present.

---
### Language

#required

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="language">
	        Language:
		</dt>
		<dd class="language" lang="en">English</dd>
```

---
### Series

#optional

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="series">
	        Series:
		</dt>
		<dd class="series">
			<span class="series">
				<a class="previous" href="/works/56363482">
					← Previous Work
				</a>
				<span class="divider">
					 
				</span>
				<span class="position">
					Part 4 of 
					<a href="/series/4297354">
						Miscellaneous Ladywow
					</a>
				</span>
				<span class="divider">
					 
				</span>
				<a class="next" href="/works/62551525">
					Next Work →
				</a>
			</span>
			,
			...
```

Work can have multiple series and if it has then each one is made with `<span class="series">` with `,` separating them.

A series can have a link to `previous` and/or `next` work which if present also adds a `divider` between the link and name of the series.

---
### Collections

#required

```html
  ...
  <div class="wrapper">
	  ...
	<dl class="work meta group">
		...
		<dt class="collections">
	        Collections:
		</dt>
		<dd class="collections">
			<a href="/collections/bb_MLB">
				Miraculous LadyBug Stories
			</a>
			,
			...
```

Work can have multiple collections and if it has then each one is made with `<a href="/collections/...">` with `,` separating them.
