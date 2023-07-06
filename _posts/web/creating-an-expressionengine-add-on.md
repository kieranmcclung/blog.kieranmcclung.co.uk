---
date: "2019-02-03T13:36:30.214Z"
title: Creating an ExpressionEngine Add-On
featuredImage: /images/expression-engine.jpg
seoDescription: >-
  How to build an ExpressionEngine Add-On and limit the use of PHP in your
  templates
showDonationLink: 1
---

I’m going to explain the use of ExpressionEngine Add-Ons, namely plugins, and how they’ll help cut down any PHP in your site templates. In short your life will be changed completely! (_unless you already know how to build plugins or don’t even use ExpressionEngine, in which case your life will be exactly the same._)

Coming from a WordPress background I was initially confused by the selection of add-ons that can be loaded onto an ExpressionEngine website. For that reason I’ll run through them all quickly for you now, in layman's terms.

### Modules

These are the ‘big boys’. If you want to create an Add-On with settings; database modification and template tags this is the route to go down. Modules allow you to create new sections within the admin area alongside database tables for all that sweet data management.

### Extensions

Extensions simply extend an existing module allowing you to call your own functions alongside them. This is usually done with hooks, something that a large number of modules include.

### Fieldtypes

This too is pretty self-explanatory. A fieldtype allows you to create a custom field which can then be assigned to a channel and populated when managing entries. This would include things such as WYSIWYG editors, standard input fields, etc.

### Plugins

A plugin, unlike in WordPress, is a simple Add-On that allows you to display information. You cannot modify or add data to a database using a plugin instead, you can grab data and manipulate it to display on the site. Plugins are not just limited to only database output, you can output any HTML from within a plugin.

Each of ExpressionEngine's Add-Ons have something in common. They're all built using PHP. This allows us to separate PHP from the HTML/EE Code templates which makes for a cleaner site.

## Creating a plugin

Firstly you'll need to create a new folder under `system/user/addons/`

You can name this folder whatever you like but it needs to be lowercase and it needs to match the main class of the plugin (see below).

Since ExpressionEngine 3, each Add-On requires an `addon.setup.php` file:

```php
<?php
return array(
	'author'      => 'Kieran McClung',
	'author_url'  => 'https://km.com',
	'name'        => 'Example Plugin',
	'description' => 'This plugin does very little.',
	'version'     => '0.0.1',
	'namespace'   => 'KM\Example_plugin'
);
?>
```

_This needs to be saved directly within the folder you created above._

The `addon.setup.php` file is relatively straight-forward and really just serves a purpose to display information about the Add-On. The above example shows all required keys for the array but you can find more over on the [ExpressionEngine documentation](https://docs.expressionengine.com/latest/development/addon-setup-php-file.htm).

Next you'll need to create the main plugin file. This file must be named after the main class (see below). You'll also need to prefix the file name with `pi`. This tells ExpressionEngine that the file is a plugin.

In my example I now have the following:

- A folder under the `system/user/addons` directory called `example_plugin`
- Contained within this directory are two files:

  - `addon.setup.php`
  - `pi.example_plugin.php`

## Make the plugin do something

I’ve created an incredibly basic plugin for this post which will grab an entry's title and trim it down to a specific length. Whilst simple, it does show a number of key things that can be done with an ExpressionEngine plugin.

```php
<?php
class Example_plugin {

	public function truncate()
	{
		// Create variables from EE parameters
		$entry_id = ee()->TMPL->fetch_param('entry_id');
		$limit    = ee()->TMPL->fetch_param('limit') ? : 30;

		// Check whether $entry_id is empty
		if (empty($entry_id))
		{
			return 'Entry ID is missing.';
		}

		// Query the database
		$query = ee()->db->select('title')
			->where('entry_id', $entry_id)
			->get('channel_titles');

		if ($query->num_rows() === 0)
		{
			return 'Sorry, not entry has been found with that ID';
		}
		else
		{
			// Get the title
			$title  = $query->row('title');
			$length = strlen($title);

			// Check whether the title's length is greater than our limit
			if ($length > $limit)
			{
				return substr($title, 0, $limit) . '…';
			}
			else
			{
				return $title;
			}
		}
	}
}
?>
```

**_Line 3_**: This is the famed class that I've been mentioning earlier on in the post. Just to reiterate, this needs to be named exactly as the plugin filename but can contain mixed-case characters.

**_Line 5_**: Here we create a public function called `truncate`. This will allow us to the use following code within our ExpressionEngine template: `{exp:example_plugin:truncate}`. Anything returned from this function will be shown once the plugin tag has been parsed.

**_Lines 8 &amp; 9_**: Next up we need to set two variables and we're utilising ExpressionEngine's Template Class to grab two parameters from the tag. If we add two parameters to our tag: `{exp:example_plugin:truncate entry_id='1' limit='20'}`we'll be able to grab them both using the `ee()->TMPL->fetch_param();` function.

**_Line 9_**: We can use a ternary operator here to ensure that a limit is always set. If no limit is passed as a parameter on the tag, we'll fallback to the 30 default.

**_Lines 12-15_**: This plugin requires an entry id in order for it to function correctly so we check for this before proceeding. If an ID isn't found we can return a helpful message to the template.

**_Lines 18-20_**: Now we need to extract the title of an entry based on the provided ID and to do this we’re going to use the Database Class. Fortunately, as was with the tag parameters, ExpressionEngine makes it stupidly easy to make database calls. We’re going to store the database query as a variable `$query` so that we can do some checks later on.

**_Line 18_**: We're initiating the database class with `ee()->db` followed by a `select()` query. In our example we only need the title field but we could use `'*'` to select all fields in the database. The string entered inside the select query relates to a field name within the database. This could also be a comma separated list of values.

**_Line 19_**: Next we need to add our where clause. We're going to use our `$entry_id` variable here to make sure that we're only getting data from a row in the database that has the value of this variable.

**_Line 20_**: Finally we tell ExpressionEngine which table we want to get the data from. In this example, we use `channel_titles`. ExpressionEngine will, by default, prefix all database tables with `exp_`. You will notice that we don't reference the database prefix when collecting data from the specified table. ExpressionEngine will sort everything out for you which is handy for sites that use their own prefixes.

Our query is now set and stored to the `$query` variable. This will perform the following SQL command:

```sql
SELECT `title`
FROM `exp_channel_titles`
WHERE `entry_id` = '1' -- 1 represents the entry_id you've passed in the tag`
```

**_Lines 22-25_**: ExpressionEngine has a handy way of checking whether anything was returned from the database call. We'll check whether the total number of results is equal to 0 and if it is we need to return a suitable message to the template.

**_Line 29_**: Here we can grab the title from the $query. We can make an assumption here without performing any extra checks. Entry IDs are unique within the channel titles table so we know the query will have only returned 1 result. Because of that, we can grab the title using `$query->row('title')`.

_If the query had returned multiple values we would either need to loop through each of these or select the first result. You can find out more information about the Database Class over on the [ExpressionEngine documentation](https://docs.expressionengine.com/latest/development/legacy/libraries/database.html)._

**_Line 30_**: This line is a simple bit of PHP which counts the length of the `$title` and stores it in the `$length` variable.

**_Lines 33-40_**: We can now use the `$length` variable to check whether it's greater than our `$limit`. If it is, we need to return the trimmed string, otherwise we can just return the title as is.

**_Line 35_**: Again, this is a fairly simple PHP function which takes our `$title` and trims it by our `$limit`. I've included an ellipsis here to indicate that there is more to the title.

And that's it! The plugin will now grab the entry's title and trim it to your specified length.

## And that's a wrap

There we have it then. I’ve given you a quick explanation of the various ExpressionEngine Add-Ons, covered the anatomy of a basic ExpressionEngine plugin, and built a simple, yet functioning, plugin. Of course there is a lot more to learn when it comes to building your own ExpressionEngine Add-Ons but this should hopefully set you on the right path.

I've included a few links below to various learning resources which reference the code used in this post.

Hopefully you’ve found this post interesting or dare I say helpful. If you'd like me to create a simple Module, drop a comment below and I'll make it so.

## Extra credit

The plugin in this post is only for demonstration purposes and my aim was to showcase a few different options for you when developing an Add-On. If you wish to use this plugin on a site that you're developing we can tidy it up a little.

```php
<?php
class Example_plugin {

	public function truncate()
	{
		$title = ee()->TMPL->fetch_param('title');
		$limit = ee()->TMPL->fetch_param('limit') ? : 30;

		if ( ! empty($title))
		{
			$length = strlen($title);

			if ($length > $limit)
			{
				return substr($title, 0, $limit) . '…';
			}
			else
			{
				return $title;
			}
		}
	}
}
?>
```

This plugin tag will be nested within your channel entries loop so it makes little sense to be making another database call. Instead, you can pass the `{title}` as a parameter to your plugin and simply check its length and carry out the trimming if necessary. Your tag would now look like `{exp:example_plugin:truncate title='{title}' limit='12'}`

## Resources

- [ExpressionEngine Documentation - Plugins](https://docs.expressionengine.com/latest/development/plugins.html)
- [ExpressionEngine Documentation - Database Class](https://docs.expressionengine.com/latest/development/legacy/libraries/database.html#database-class)
- [PHP Manual - strlen](http://php.net/manual/en/function.strlen.php)
- [PHP Manual - substr](http://php.net/manual/en/function.substr.php)
