/*
* DNA to mRNA to Protein Converter Function.
* SYNTAX: converter(Strand,StrandType);
* Strand is a strand only consisting of A's G's C's and T's or U's.
* 
* 
*/
function converter(input, StrandType){
    
    //checks to see if 
    TMjsUExistCheck('v1.0.0','banana','54be25ec596f7c331fab62ebbf461d14');
	//Make input all uppercase.
    input = input.toUpperCase();
	//Remove all spaces in the string.
    input = input.replace(/ /g, "");
	
	//Add's a space every three characters.
    input = insertNthChar(input, ' ', 3);
    
	//Checks if the input strand is DNA or mRNA so it can be processed.
	if(StrandType=='DNA'){
        //Checks to see if there are other letters than A, T, C, G.
        if(input.replace(/ |A|G|C|T/g,"") !== ""){return "Letters other than A, T, C, G exist in the input!";}
		var DNA=input;
        var mRNA=DNAtomRNA(DNA);
        var Prot=mRNAtoProt(mRNA);
	}else if(StrandType=='mRNA'){
    //Checks to see if there are other letters than A, U, C, G.
        if(input.replace(/ |A|G|C|U/g,"") !== ""){return "Letters other than A, U, C, G exist in the input!";}
		var mRNA=input;
        var DNA=mRNAtoDNA(mRNA);
        var Prot=mRNAtoProt(mRNA);
	}else{
		return "UNKNOWN STRAND TYPE!";
	}
    
    var DNA = DNA.replace(/ACT/g,"ACT_");
    var DNA = DNA.replace(/ATT/g,"ATT_");
    var DNA = DNA.replace(/ATC/g,"ATC_");
    var mRNA = mRNA.replace(/UGA/g,"UGA_");
    var mRNA = mRNA.replace(/UAA/g,"UAA_");
    var mRNA = mRNA.replace(/UAG/g,"UAG_");
    
    
    //Converts the DNA strand to mRNA.
    function DNAtomRNA(vDNAtomRNA){
        //Replaces each charachter with the corresponding letter. (A->U & G->C & C->G & T->A)
        var vDNAtomRNA = vDNAtomRNA.replace(/A/g, "U");
        var vDNAtomRNA = vDNAtomRNA.replace(/G/g, "1");
        var vDNAtomRNA = vDNAtomRNA.replace(/C/g, "G");
        var vDNAtomRNA = vDNAtomRNA.replace(/1/g, "C");
        var mRNA = vDNAtomRNA.replace(/T/g, "A");
        return mRNA;
    }
    //Converts the mRNA strand to DNA.
    function mRNAtoDNA(vmRNAtoDNA){
        //Replaces each charachter with the corresponding letter. (U->A & C->G & G->C & A->T)
        var vmRNAtoDNA = vmRNAtoDNA.replace(/A/gi, "T");
        var vmRNAtoDNA = vmRNAtoDNA.replace(/G/gi, "1");
        var vmRNAtoDNA = vmRNAtoDNA.replace(/C/gi, "G");
        var vmRNAtoDNA = vmRNAtoDNA.replace(/1/gi, "C");
        var DNA = vmRNAtoDNA.replace(/U/gi, "A");
        return DNA;
    }
    //Converts the mRNA strand to an amino acid chain (a protein).
    function mRNAtoProt(vmRNAtoProt){
        //Replaces each codon with the corresponding amino acid.
        var vmRNAtoProt = vmRNAtoProt.replace(/UUU/gi, "PHE");
        var vmRNAtoProt = vmRNAtoProt.replace(/UUC/gi, "PHE");
        var vmRNAtoProt = vmRNAtoProt.replace(/UUA/gi, "LEU");
        var vmRNAtoProt = vmRNAtoProt.replace(/UUG/gi, "LEU");
        var vmRNAtoProt = vmRNAtoProt.replace(/CUU/gi, "LEU");
        var vmRNAtoProt = vmRNAtoProt.replace(/CUC/gi, "LEU");
        var vmRNAtoProt = vmRNAtoProt.replace(/CUA/gi, "LEU");
        var vmRNAtoProt = vmRNAtoProt.replace(/CUG/gi, "LEU");
        var vmRNAtoProt = vmRNAtoProt.replace(/AUU/gi, "ILE");
        var vmRNAtoProt = vmRNAtoProt.replace(/AUC/gi, "ILE");
        var vmRNAtoProt = vmRNAtoProt.replace(/AUA/gi, "ILE");
        var vmRNAtoProt = vmRNAtoProt.replace(/AUG/gi, "MET");
        var vmRNAtoProt = vmRNAtoProt.replace(/GUU/gi, "VAL");
        var vmRNAtoProt = vmRNAtoProt.replace(/GUC/gi, "VAL");
        var vmRNAtoProt = vmRNAtoProt.replace(/GUA/gi, "VAL");
        var vmRNAtoProt = vmRNAtoProt.replace(/GUG/gi, "VAL");
        var vmRNAtoProt = vmRNAtoProt.replace(/UCU/gi, "SER");
        var vmRNAtoProt = vmRNAtoProt.replace(/UCC/gi, "SER");
        var vmRNAtoProt = vmRNAtoProt.replace(/UCA/gi, "SER");
        var vmRNAtoProt = vmRNAtoProt.replace(/UCG/gi, "SER");
        var vmRNAtoProt = vmRNAtoProt.replace(/CCU/gi, "PRO");
        var vmRNAtoProt = vmRNAtoProt.replace(/CCC/gi, "PRO");
        var vmRNAtoProt = vmRNAtoProt.replace(/CCA/gi, "PRO");
        var vmRNAtoProt = vmRNAtoProt.replace(/CCG/gi, "PRO");
        var vmRNAtoProt = vmRNAtoProt.replace(/ACU/gi, "THR");
        var vmRNAtoProt = vmRNAtoProt.replace(/ACC/gi, "THR");
        var vmRNAtoProt = vmRNAtoProt.replace(/ACA/gi, "THR");
        var vmRNAtoProt = vmRNAtoProt.replace(/ACG/gi, "THR");
        var vmRNAtoProt = vmRNAtoProt.replace(/GCU/gi, "ALA");
        var vmRNAtoProt = vmRNAtoProt.replace(/GCC/gi, "ALA");
        var vmRNAtoProt = vmRNAtoProt.replace(/GCA/gi, "ALA");
        var vmRNAtoProt = vmRNAtoProt.replace(/GCG/gi, "ALA");
        var vmRNAtoProt = vmRNAtoProt.replace(/UAU/gi, "TYR");
        var vmRNAtoProt = vmRNAtoProt.replace(/UAC/gi, "TYR");
        var vmRNAtoProt = vmRNAtoProt.replace(/UAA/gi, "STOP");
        var vmRNAtoProt = vmRNAtoProt.replace(/UAG/gi, "STOP");
        var vmRNAtoProt = vmRNAtoProt.replace(/CAU/gi, "HIS");
        var vmRNAtoProt = vmRNAtoProt.replace(/CAC/gi, "HIS");
        var vmRNAtoProt = vmRNAtoProt.replace(/CAA/gi, "GLN");
        var vmRNAtoProt = vmRNAtoProt.replace(/CAG/gi, "GLN");
        var vmRNAtoProt = vmRNAtoProt.replace(/AAU/gi, "ASN");
        var vmRNAtoProt = vmRNAtoProt.replace(/AAC/gi, "ASN");
        var vmRNAtoProt = vmRNAtoProt.replace(/AAA/gi, "LYS");
        var vmRNAtoProt = vmRNAtoProt.replace(/AAG/gi, "LYS");
        var vmRNAtoProt = vmRNAtoProt.replace(/GAU/gi, "ASP");
        var vmRNAtoProt = vmRNAtoProt.replace(/GAC/gi, "ASP");
        var vmRNAtoProt = vmRNAtoProt.replace(/GAA/gi, "GLU");
        var vmRNAtoProt = vmRNAtoProt.replace(/GAG/gi, "GLU");
        var vmRNAtoProt = vmRNAtoProt.replace(/UGU/gi, "CYS");
        var vmRNAtoProt = vmRNAtoProt.replace(/UGC/gi, "CYS");
        var vmRNAtoProt = vmRNAtoProt.replace(/UGA/gi, "STOP");
        var vmRNAtoProt = vmRNAtoProt.replace(/UGG/gi, "TRP");
        var vmRNAtoProt = vmRNAtoProt.replace(/CGU/gi, "ARG");
        var vmRNAtoProt = vmRNAtoProt.replace(/CGC/gi, "ARG");
        var vmRNAtoProt = vmRNAtoProt.replace(/CGA/gi, "ARG");
        var vmRNAtoProt = vmRNAtoProt.replace(/CGG/gi, "ARG");
        var vmRNAtoProt = vmRNAtoProt.replace(/AGU/gi, "SER");
        var vmRNAtoProt = vmRNAtoProt.replace(/AGC/gi, "SER");
        var vmRNAtoProt = vmRNAtoProt.replace(/AGA/gi, "ARG");
        var vmRNAtoProt = vmRNAtoProt.replace(/AGG/gi, "ARG");
        var vmRNAtoProt = vmRNAtoProt.replace(/GGU/gi, "GLY");
        var vmRNAtoProt = vmRNAtoProt.replace(/GGC/gi, "GLY");
        var vmRNAtoProt = vmRNAtoProt.replace(/GGA/gi, "GLY");
        var Prot = vmRNAtoProt.replace(/GGG/gi, "GLY");
        return Prot;
    }
    
return {'DNA': DNA,'mRNA': mRNA,'Prot': Prot};}