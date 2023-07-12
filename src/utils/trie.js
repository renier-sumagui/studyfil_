class TrieNode {
    constructor(key) {
        this.key = key; // the "key" value will be the character in sequence
        this.parent = null; // we keep a reference to parent
        this.children = {}; // we have hash of children
        this.end = false; // check to see if the node is at the end
    }
    
    // iterates through the parents to get the word.
    // time complexity: O(k), k = word length
    getWord() {
        let output = [];
        let node = this;
        
        while (node !== null) {
            output.unshift(node.key);
            node = node.parent;
        }
        
        return output.join('');
    }
  }
  
  // we implement Trie with just a simple root with null value.
class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }
    
    // inserts a word into the trie.
    // time complexity: O(k), k = word length
    insert(word) {
        let node = this.root; // we start at the root 
        
        // for every character in the word
        for (let i = 0; i < word.length; i++) {
            // check to see if character node exists in children.
            if (!node.children[word[i]]) {
                // if it doesn't exist, we then create it.
                node.children[word[i]] = new TrieNode(word[i]);
                
                // we also assign the parent to the child node.
                node.children[word[i]].parent = node;
            }
        
        // proceed to the next depth in the trie.
        node = node.children[word[i]];
        
        // finally, we check to see if it's the last word.
            if (i === word.length - 1) {
            // if it is, we set the end flag to true.
            node.end = true;
            }
        }
    }
    
    // check if it contains a whole word.
    // time complexity: O(k), k = word length
    contains(word) {
        let node = this.root;
      
      // for every character in the word
        for (let i = 0; i < word.length; i++) {
            // check to see if character node exists in children.
            if (node.children[word[i]]) {
            // if it exists, proceed to the next depth of the trie.
            node = node.children[word[i]];
            } else {
            // doesn't exist, return false since it's not a valid word.
            return false;
            }
        }
        
        // we finished going through all the words, but is it a whole word?
        return node.end;
    }
    
    // returns every word with the given prefix
    // time complexity: O(p + n), p = prefix length, n = number of child paths
    find(prefix) {
        let node = this.root;
        let output = [];
        
        // for every character in the prefix
        for (let i = 0; i < prefix.length; i++) {
            // make sure the prefix actually has words
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            } else {
            // there's none. just return it.
                return output;
            }
        }
      
        // recursively find all words in the node
        this.findAllWords(node, output);
        
        return output;
    }
    
    // recursive function to find all words in the given node.
    findAllWords(node, arr) {
        // base case, if node is at a word, push to output
        if (node.end) {
            arr.unshift(node.getWord());
        }
      
        // iterate through each children, call recursive findAllWords
        for (let child in node.children) {
            this.findAllWords(node.children[child], arr);
        }
    }
}

export { Trie };