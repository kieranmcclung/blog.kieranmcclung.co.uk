---
date: "2020-05-10T08:06:51.107Z"
title: BEM SASS — A Match Made in Heaven
featuredImage: /images/7c30a127-b08f-4c08-9879-3c78f413b822.jpeg
seoDescription: >-
  Both BEM and SASS are nothing new when it comes to web development but when
  combined they’re a force to be reckoned with
showDonationLink: 1
---

Both BEM and SASS are nothing new when it comes to web development and with atomic and component-driven CSS gaining in popularity it makes me wonder whether this post is a little too late. Alas, I’m here waxing lyrical about these well-known web practices.

I’m a traditionalist when it comes to web development, quite the oxymoron, I know. I’ve always preferred typing out my code as opposed to using software such as Dreamweaver or web building tools like Macaw. I know that if I type out my code it’s going to be to my exacting standards, for better or worse. But it does come with a downfall and that’s the time it takes to write it. Enter SASS.
I’ve been building websites for the best part of a decade now and funnily enough both LESS and SASS have been options for me from the go. But when I first started building websites they honestly just confused the heck out of me.

It wasn’t until a year into working as a web developer professionally that I decided to use a preprocessor and I had two choices before me. LESS or SASS. This wasn’t the first time I’ve had to choose between two technologies but fortunately, I chose better this time around. _Who else bought an HD-DVD Player over Blu-ray the day before it collapsed?_ I opted for SASS.

For the uninitiated, SASS is a powerful variation on CSS which allows the use of variables, functions, nesting and the separating of your styles into different files. In short, it’s bloody handy! And it’s the latter that plays into BEM's hands.

BEM is something I’ve shunned as soon as it became known to me mainly due to it ruining my code with double underscores and dashes. It looks incredibly messy (IMHO) but after working on a huge project I needed to look at some kind of naming convention for my CSS. The site in question had roughly 10 different button styles and before long I had miscellaneous classes such as `.red .facebook .rounded .yellow-rounded` etc. It wasn’t great. When I returned to the project it was nigh on impossible to figure out which class did what so I ended up creating more. It was not a good time. It was this that spurred me on to look at naming conventions and I decided to bite the bullet, opting for BEM.

> There are only two hard things in Computer Science: cache invalidation and naming things.
> _Phil Karlton_

Phil knows what he’s on about. Naming things is a massive pain in the arse. But BEM is our saviour.

BEM stands for Block Element Modifier and works as such. Your block, in the case a button, would have its own class `.button`. If you wanted to modify this button you can do so by creating a class such as `.button--red or .button—-rounded`. If you had an element within the button, maybe an icon, you’d have `.button__icon`. The double dashes denote a modifier whereas the double underscores denote an element. This doesn’t necessarily eliminate the issue I had with my buttons earlier, at least from a point of limiting the number of classes, but it helps make everything more cohesive and manageable. That’s both SASS and BEM but how do they marry? Beautifully.

I mentioned earlier that SASS allows for nesting and it does so by simply adding a selector within a parent's curly braces.

```scss
.button {
	.red {
	}
}
```

This would compile as

```css
.button .red {
}
```

This is handy for certain applications but doesn’t necessarily help us with BEM. Well... SASS also makes use of the ampersand symbol when nesting. Instead of standard nesting, the ampersand tells us to append the child selector to its parent. This means we can now do the following:

```scss
.button {
	&.red {
	}
}
```

which compiles as

```css
.button.red {
}
```

We’re now targeting an element with the classes button and red rather than looking for a red class nested within a button class. The ampersand can also be used for pseudo-elements and states such as active, focus, hover etc. It’s an incredibly useful feature of SASS.

But let’s go back to BEM for a second. We know that BEM stands for block, element, modifier and it does this by appending `__element` or `--modifier` to the block. You know what that means! We can do the following:

```scss
.block {
	&element {
	}
	&--modifier {
	}
}
```

and it will compile as so:

```css
.block {
}
.block__element {
}
.block--modifier {
}
```

It’s good, right? It means we can utilise one of SASSs (arguably) most time-saving features (nesting) to create a load of BEM classes which, in turn, makes our styles less dependent. It’s the best of both worlds!

And it doesn’t stop there. If we jump back to another feature of SASS that I mentioned earlier - separating your styles into multiple files - we can start to build an incredibly easy to manage SASS BEM project. Each block can have its own file which we’ll import into the master SASS file.

This combo has genuinely revolutionised the way I approach web development, and in fact, design. I can start thinking of a site as a series of blocks (or modules) rather than a complete unit. This helps make a large site somewhat more digestible, especially during the early stages of development. It also means that when I return to a project I know where my classes are hiding. You could argue that CMD + F would help with that but if I need to add a new form I can jump straight into form block and see what existing styles are ready for me to use. If I need a modifier, I’ll add it, if I need a new component, I’ll add it.

Anything to make web development that little bit easier is a win in my eyes and BEM SASS is exactly that. You aren’t forgoing your creativity and succumbing to the whims of automation with this combination but you are creating more manageable CSS which goes a long way when developing a website.
