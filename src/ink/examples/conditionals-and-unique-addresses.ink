-> start

=== start ===
*	{ not visit_paris } 	      [Go to Paris] -> visit_paris
+ { visit_paris } 		        [Return to Paris] -> visit_paris 
*	{ visit_paris.met_estelle } [Telephone Mme Estelle] -> phone_estelle

=== visit_paris ===
It's so lovely this time of year. La Tour D'Eiffel, perchance?

-> met_estelle

= met_estelle
Bonjour, Mme Estelle!

-> start

=== phone_estelle ===
Allo? Mme Estelle? Comment vas-tu?
-> start
