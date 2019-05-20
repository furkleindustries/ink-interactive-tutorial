-> the_orient_express

=== the_orient_express ===
= in_first_class 
	Mmm, complimentary spinach wraps!
  -> END
= in_third_class
	It's alright. Nothing special.
  -> END
= in_the_guards_van 
	How very authentic.
  -> END
= missed_the_train
	Oops! No adventure for you.
  -> END


* [Sneak onto first class]
  -> the_orient_express.in_first_class

*	[Travel in third class]
	-> the_orient_express.in_third_class

*	[Travel in the guard's van]
	-> the_orient_express.in_the_guards_van

* [Go home]->the_orient_express.missed_the_train
