
<?php $title='Filuppladdning'; include(__DIR__ . '/../mall/header.php'); ?>

<div id='flash'>
	<H1 id='text'>Hi this text should be replaced when page and DOM is loaded.
		If it is not removed, I most likely have a problem with my JavaScript.
		But then again, who doesn't have a problem with JavaScript</H1>


		<form class="offline" id="form" method="post" action="fisk.php" enctype="multipart/form-data">
			<label>Title <input type="text" id="title" name="title" placeholder="Title goes here" /></label>
			<label>Summarize<textarea id="summary" name="summary" placeholder="Summarize the point of the meeting, perhaps make some bulletpoints of toppics"></textarea></label>
			<label>Attachment<input name="file" type="file" id="file" enctype="multipart/form-data"/></label>
			<input type="submit" name="send" value="send">

		</form>
		<div id="right">
			
				<div id="tableholder">
				<header>
					<h2>IndexedDB</h2>
				</header>
				<table id="table">
							
				</table>
				<a id="uploadIndexedDB">Send</a>
				
				<header>
					<h2>IndexedDB</h2>
				</header>
				<table id="table2">
						
				</table>
				
				
				</div>
			
		</div>
		<div class="clear">
			<p>©Marcus Rehn</p>
		</div>
		<img src="" alt="" id="imglel" />

	</div>


	<?php $path=__DIR__; include(__DIR__ . '/../mall/footer.php'); ?>