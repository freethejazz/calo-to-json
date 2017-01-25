# Convert the Enron emails to JSON

This operates on the CALO dataset, and is pretty hackish.

### Usage instructions
```
npm install
# or
yarn
```

Get the [CALO dataset](http://www.cs.cmu.edu/~enron/).
Untar it here. The directory structure should look something like:
```
|-- index.js
|-- maildir
    |-- allen-p
        |-- inbox
        |-- ...
    |-- arnold-j
    |-- ...
|-- package.json
|-- ...

Then, simply run `node index.js`. The application will read in emails,
convert them to JSON, write them in place, and delete the original
plaintext emails. The process isn't great, but gave me a quick and easy
way to cancel and resume the process without having to start from the
beginning. As a result, if you want to modify the conversion, you'll
have to remove the `maildir` and unpack the tar with the plaintext
emails again.

### Alternatives

A compressed mongodb back up file.
http://mongodb-enron-email.s3-website-us-east-1.amazonaws.com/
