<?php 
$settings = $GLOBALS['settings'];
$addons = $GLOBALS['addons'];
?>
<div class="modal fade" id="dg-share" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>						
				<h4><?php echo lang('designer_share_save_completed'); ?></h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="exampleInputEmail1"><?php echo lang('designer_share_your_design_link'); ?>:</label>
					<input type="text" class="form-control" id="link-design-saved" value="" readonly>
				</div>
				
				<div class="form-group row">
					<label class="col-xs-1 col-sm-1 col-md-1" style="line-height: 24px;"><?php echo lang('designer_share'); ?>: </label>					
					<div class="col-xs-1 col-sm-1 col-md-1">
						<a href="javascript:fn()" class="" title="Line"><img src="https://d.line-scdn.net/r/web/social-plugin/img/common/square-default-small.png" width="25" height="25" title="Share this page on LINE"></a>
						
<script>
	 function fn(){
			var URLS = document.getElementById("link-design-saved").value;
			var ulr = 'https://social-plugins.line.me/lineit/share?url='+encodeURIComponent(URLS);
			window.open(ulr, "popupWindow", "width=600,height=600,scrollbars=yes");
		}
		
		</script>						
					</div>
					<div class="col-xs-1 col-sm-1 col-md-1">
						<a href="javascript:void(0)" onclick="design.share.facebook()" class="icon-25 share-facebook" title="Facebook"></a> 
					</div>
					<div class="col-xs-1 col-sm-1 col-md-1">
						<a href="javascript:void(0)" onclick="design.share.twitter()" class="icon-25 share-twitter" title="Twitter"></a>
					</div>
					<div class="col-xs-1 col-sm-1 col-md-1">
						<a href="javascript:void(0)" onclick="design.share.pinterest()" class="icon-25 share-pinterest" title="Pinterest"></a> 
					</div>
					<?php $addons->view('share'); ?>
				</div>
			</div>
		</div>
	</div>
</div>