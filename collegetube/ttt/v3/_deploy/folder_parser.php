<?php

	// Set your return content type
	header('Content-type: text/xml');

    //directory to read
    $dir = ($_REQUEST['dir']);
	$sub_dirs = isBoolean(($_REQUEST['sub_dirs']));
	
	if(file_exists($dir)==false){
		//echo $_SERVER['DOCUMENT_ROOT'];
		//echo "current working directory is -> ". getcwd();
		echo 'Directory \'', $dir, '\' not found!';
	}else{
		$temp = getFileList($dir, $sub_dirs);
		echo json_encode($temp);
	}
	
	function isBoolean($value) {
	   if ($value && strtolower($value) !== "false") {
		  return true;
	   } else {
		  return false;
	   }
	}
	
	function getFileList($dir, $recurse){ 
		
		$retval = array(); // array to hold return value 
		if(substr($dir, -1) != "/") // add trailing slash if missing 
		$dir .= "/"; // open pointer to directory and read list of files 
		$d = @dir($dir) or die("getFileList: Failed opening directory $dir for reading"); 
		
		while(false !== ($entry = $d->read())) { // skip hidden files
			if($entry[0] == "." || $entry[0] == "..") continue; 
			
			if(is_dir("$dir$entry")) { 
				if($recurse && is_readable("$dir$entry/")) { 
					$retval = array_merge($retval, getFileList("$dir$entry/", true)); 
				}
			}else if(is_readable("$dir$entry")) {
				$path_info = pathinfo("$dir$entry");
				if(strtolower($path_info['extension'])=='mp4'){
					$retval[] = array( 
						"path" => "$dir$entry", 
						"type" => $path_info['extension'],
						"size" => filesize("$dir$entry"), 
						"lastmod" => filemtime("$dir$entry") 
					); 
				}
			} 
		} 
		$d->close();
		return $retval; 
	}
?>
