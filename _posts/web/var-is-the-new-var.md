---
date: "2020-03-31T15:39:23.659Z"
title: "var() is the new $var"
featuredImage: /images/var-blocks.jpg
seoTitle: var() is the new $var — swapping SASS variables for CSS variables
seoDescription: >-
  I've started swapping out SASS variables for CSS variables for a bunch of
  benefits and cleaner code. Check out what I've been up to!
showDonationLink: 1
---

Okay, it's not that new, but `var()` has quickly become a suitable alternative to SASS' `$var` in my projects.

One of SASS' many great features is the ability to use variables. It's perfect for colour values, font families and sizes and spacing (padding and margins) basically any value you want to repeat throughout your stylesheet. It allows us to do handy things like this:

```scss
$spacing: 2em;

.box {
	margin-bottom: $spacing;
}

.section {
	padding: $spacing;
}
```

Once compiled, our selectors will have consistent spacing. If we decided that `2em` wasn’t quite right, we’d simply need to adjust the variable’s value and it would update throughout the rest of our project. It’s awesome!

If we decided that `2em` was fine for smaller screens but wanted to adjust the value to better accommodate a larger screen we’d simply add a couple more variables and a handful of media queries:

```scss
$spacing-sm: 2em;
$spacing-md: 3.5em;
$spacing-lg: 5em;

.box {
	margin-bottom: $spacing-sm;

	@media only screen and (min-width: 768px) {
		margin-bottom: $spacing-md;
	}

	@media only screen and (min-width: 1200px) {
		margin-bottom: $spacing-lg;
	}
}

.section {
	padding: $spacing-sm;

	@media only screen and (min-width: 768px) {
		padding: $spacing-md;
	}

	@media only screen and (min-width: 1200px) {
		padding: $spacing-lg;
	}
}
```

Now we have consistent spacing across multiple sized devices and can independently tweak these variable’s values without having to trawl through lines of code. But there’s quite a bit of code here. It’d be nice if we could cut this down a bit, wouldn’t it? Well, we can! With the use of the `var()` function.

The `var()` function allows us to reference native CSS variables without any pre-processors. Variables are usually declared within the `:root` pseudo-selector so that they can be accessed globally and are denoted by double dashes (--).

> Variables can be set on any element and will inherit the value based on the most immediate reference but it’s likely you’ll stick to setting these globally

If we were to replace our SASS variables with CSS ones, we’d simply do the following:

```scss
:root {
	--spacing: 2em;
}

.box {
	margin-bottom: var(--spacing);
}

.section {
	padding: var(--spacing);
}
```

We’ve set the variable in the `:root` pseudo-selector and are referencing it in our `.box` and `.section` classes by using the `var()` function. In this small example, we’ve not really gained anything. In fact, our compiled code is larger than the SASS example before it, but one of the great things about CSS variables is that we can adjust their values in media queries:

```scss
:root {
	--spacing: 2em;

	@media only screen and (min-width: 768px) {
		--spacing: 3.5em;
	}

	@media only screen and (min-width: 1200px) {
		--spacing: 5em;
	}
}

.box {
	margin-bottom: var(--spacing);
}

.section {
	padding: var(--spacing);
}
```

The above example gives us the exact same outcome as the SASS variable example before it but rather than changing the value at class level, we're adjusting it globally in one tidy declaration. Even in this small example, we can see how much of an impact it has on the cleanliness of the code.

But using CSS variables has another benefit. We can adjust their values using JavaScript.

Dark mode is all the rage nowadays with many sites giving users the choice between viewing websites dark on light or light on dark. This is usually initiated by some sort of button press or, if you’re fancy, you can use one of the “new” `prefers-color-scheme` media queries. We’ll ignore that for now because it ruins the rest of my post…

A traditional way of implementing this would be to add/remove a class to the body and adding a bunch of styles for that selector:

```scss
$colour-primary: #f7f7f7;
$colour-secondary: #252525;

body {
	background-color: $colour-primary;
	color: $colour-secondary;

	&.dark-mode {
		background-color: $colour-secondary;
		color: $colour-primary;
	}
}
```

This doesn’t look too bad on the face of it but if you start accounting for other bits such as table borders and miscellaneous decorations, it could get quite cumbersome. But not with `var()`.

```scss
:root {
   --background-colour: #f7f7f7
   --text-colour: #252525;
}

body {
   background-color: var(--background-colour);
   color: var(--text-colour);
}
```

Again, we set our variables in the `:root` selector and then reference them in our `body` selector. But instead of adding/removing a class to the body, we can simply adjust those two variable values using JavaScript:

```javascript
element.style.setProperty("--background-colour", "#252525");
element.style.setProperty("--text-colour", "#f7f7f7");
```

Any references to those two variables in our stylesheet have now reversed resulting in the site magically turning to dark mode. It’s good, right? _This is how I’m managing dark/light (and a hidden) mode on my site._

I’m still just scratching the surface with CSS variables but these are just a couple of ways I’ve tidied up some of the projects I’m working on and I thought I’d share them. Already at this low-level, I'm seeing huge benefits from swapping out SASS variables for CSS ones. It's not been a complete swap out, mind. Things such as transition styles, font families and media query breakpoints tend to stay consistent so it makes no sense to change them. But for simple units and values, it's been a game-changer.

Browser support is also great. Obviously, IE is a no go because it's IE but other modern-browsers are all good to go. You can [check out the support here](https://caniuse.com/#feat=css-variables) and obviously provide fallbacks if you think them necessary.

As alway, feel free to hit me up on Twitter if you’re running into any web dev problems or just fancy a chat about websites and CSS. It’s a thrilling invitation, I know.
