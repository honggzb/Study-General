@import (reference) "../../style/format/variables.less";
@import (reference) "../../style/format/mixins.less";

.ot-inspectorview
	{
	.display-flex();
	.flex-direction(column);
		
	.ot-inspectorview-header
		{
		padding: 1rem;
		padding-right: 0.5rem;
		.display-flex();
			
		& > .ot-inspector-asset-type
			{
			width: 2.75rem;
			height: 2.75rem;
			margin-right: 1rem;
			background-size: contain;
			}
			
		.ot-inspectorview-header-content
			{
			.flex(1);
			position: relative;
				
			& > div:first-child
				{
				min-height: 1.75rem;
					
				.display-flex();
				
				ot-metadata
					{
					.flex(1);	
					}
				}
				
			& > div:nth-child(2)
				{
				height: 1rem;
				.display-flex();
					
				& > ot-point:nth-child(2)
					{
					.flex(1);
					text-align: right;
					}
				}
			}
		}
		
	.ot-inspectorview-asset-title
	{
		color: @titlecolor;
		font-size: 1.5rem;
		word-break: break-all;
	}
		
	.ot-inspectorview-content
		{
		.flex(1);
		position: relative;		
		.display-flex();
			
		.ot-inspectorview-tabcontent
			{
			.flex(1);
			position: relative;
			width: 60vw;
				
			.ot-tab-content
				{
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				overflow: auto;
					
				&:not(.otui-visible)
					{
					display: none;
					}
					
				.ie &
					{
					& > *
						{
						height: 100%;	
						box-sizing: border-box;
						}
					}
				}
				.ot-results[template="grid-cell"]
				{
					min-height: 4rem;
				}
				
				.ot-content
				{
					width: 100%;
					height: 100%;
				}
			}
		}
		
	[ot-view-title][editable][ot-edit-mode="edit"] input
		{
		vertical-align: top;
		height: calc(~"1.75rem - 4px");
			
		color: @titlecolor;
		font-size: 1.25rem;
		width: calc(~"100% - 2rem");
		}
		
	[ot-group-contents] > ot-metadata:not([data-type="table"])
		{
		input[type="text"]:not(.hasDatepicker)
			{
			width: calc(~"100% - 1rem");	
			}
		
		textarea
			{
			width: calc(~"100% - 1rem - 6px ");	
			}
		}
	.ot-results-wrapper
		{
		display: block;
	}
	}

.ot-inspector-permission-text
{
	font-size: 1rem;
	color: #666666;
	
	.display-flex();
	height: 100%;
	.justify-content(center);
	align-items: center;
	ot-i18n
		{
		.align-self(center);
		}
}

ot-point[ot-lookup="InspectorEditActions"]
	{
	position: relative;
	top: -2px;
	}

.ot-inspectorview-preview-grabber
	{
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: calc(~"1rem + 4px");

	background-image: url('../../style/img/gripper16.png');
	background-repeat: no-repeat;
	background-position: center;
		
	z-index: 1;

	&::after
		{
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;

		border-right: 1px solid @preview_border;

		.gradient_horizontal(rgba(0,0,0,0), rgba(0,0,0,0.1));
		}

	cursor: none;

	.ot-inspectorview-preview-cursor
		{
		width: 1.5rem;
		height: 1.5rem;

		position: absolute;
		left: -0.6rem;
		z-index: 1;

		background-image: url('../../style/img/cursor_drag24.png');
		background-repeat: no-repeat;

		pointer-events: none;

		display: none;
		}

	&:hover:not(.ui-draggable-dragging)
		{
		.ot-inspectorview-preview-cursor
			{
			display: block;	
			}

		&::after
			{
			background-image: none;
			border-color: transparent;

			background-color: @element_hover_border;
			}
		}

	&.ui-draggable-dragging
		{
		z-index: 1000;
		.background(@preview_bg);
			
		.ot-inspectorview-preview-cursor
			{
			display: block;	
			}

		&::after
			{
			background-image: none;
			border-color: transparent;

			background-color: @element_active_border;
			}
		}
	}

.ot-inspectorview[overlayed]
	{
	.ot-inspectorview-previewarea .ot-inspectorview-preview-content ot-rendition[preview] object
		{
		.transform(translateY(200%));	
		}
		
	}

.ot-inspectorview-previewarea
	{
	width: 40vw;
	padding: 1rem;
	padding-left: calc(~"1rem + 4px");
		
	box-sizing: border-box;
		
	position: relative;
		
	background-color: @preview_bg;
		
	.ot-rendition-open-fullscreen
		{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
			
			a
				{
				display: inline-block;
				height: 2rem;
				line-height: 2rem;
				}
		}
		
		
	.ot-inspectorview-preview-content
		{
		text-align: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
			
		padding: inherit;
			
		ot-rendition-list
			{
			position: relative;
			text-align: left;
			width: 100%;
			height: 100%;
			}
			
		ot-rendition[preview]
			{
			width: 100%;
			height: 100%;	
				
			object 
				{
				.transform(translateY(0));
				will-change: transform;
			}
			}
			
		.upload-dropzone-area
			{
			padding: 1rem 0;	
			}
		}
		
	&.dragblock object
		{
		display: none;
		}
		
	.ot-inspectorview-preview-max
		{
		position: absolute;
		right: 0.25rem;
		top: -2.25rem;
			
		width: 1rem;
		height: 1rem;
			
	 	.toggle-button(url('../../style/img/expand16_sprite.png'));
			
		&:not(:hover):not(:focus):not(:active)
			{
			background-color: transparent;	
			}
		}
		
	&[no-content] .ot-inspectorview-preview-max
		{
		display: none;	
		}
		
	.ot-mediaeffect
		{
		display: block;
		text-align: center;
		height: 100%;
			
		.mejs-container
			{
			margin: 0 auto;	
			}
		}
	}

.ot-inspectorview.max-preview
	{
	ot-tabs
		{
		display: none;	
		}
		
	.ot-inspectorview-tabcontent
		{
		display: none;	
		}
		
	.ot-inspectorview-previewarea
		{
		width: 100vw !important;
		}
		
	.ot-inspectorview-preview-grabber
		{
		display: none;	
		}
		
	.ot-inspectorview-preview-max
		{
		// TODO Need proper image inserted into ::after
		top: 0.75rem;
			
		&::after
			{
			background-image: url('../../style/img/collapse16_sprite.png');	
			}
		}
		
	.ot-inspectorview-preview-content
	{
		padding-left: 2.5rem;
		padding-right: 2.5rem;
	}
		
	.ot-touch-ui &
		{
		top: 2rem;
		bottom: 0;
		left: 0;
		right: 0;
			
		background-color: @view_bg;
		z-index: 10;
			
		.ot-inspectorview-header
			{
			display: none;	
			}
			
		.ot-inspectorview-preview-content
			{
			position: relative;
			padding: 0;
			padding-left: 2.5rem;
			padding-right: 2.5rem;
			
			overflow: auto;
				
			ot-rendition
				{
				height: calc(~"100% - 2rem");
				width: auto;
					}
				}
			}	
		}

.ot-inspectorview-header-content div .ot-button.ot-inspectorview-close
	{
	.toggle-button(url('../../style/img/dismiss16_sprite16sprite.png'));
	padding: calc(~"0.375rem - 2px");
	}

.ot-inspectorview-asset-status-msg
	{
		cursor: default;
		display: inline-block;
		margin-right: 0.75em;
		vertical-align: top;
		
		font-size: 0.875rem;
		height: 1rem;
		
		color: #666666;
		
		& > *
			{
			vertical-align: sub;
			}

		.ot-inspector-view-asset-status-img
			{
			vertical-align: middle;
			background-position: left center;
			background-repeat: no-repeat;
			width: 1rem;
			height: 1rem;
			display: inline-block;
			}
	}

.inspector-asset-action
	{
	font-size: 0.75rem;	
	
	cursor: pointer;
		
	[ot-img].ot-img-set
		{
		background-repeat: no-repeat;
		width: 1rem;
		height: 1rem;
		display: inline-block;
		}
	
	& > *
		{
		vertical-align: middle;
		}
		
	.ot-as-list &
		{
		// This is copied from the ot-button style as we need different styles depending on whether it's in a list or in a menu
		// Not ideal but that's how it rolls I guess.
		box-sizing: content-box;

		display: inline-block;
		border: none;
		.border_radius(0.188rem);
			
		height: 1.75rem;
		line-height: 1.75rem;
		min-width: 3rem;
		
		text-align: center;
		text-decoration: none;

		padding: 0 0.5rem;
		margin: 2px;

		color: @button_secondary_color;
		.background(@button_secondary_bg);

		&:focus:not(:active)
			{
			.button-border(@button_border_hover);
			outline: 0;
			}

		&:hover
			{
			.button-border(@button_border_hover);
			}

		&:active
			{
			.button-border(@button_border_active, 1px);
			}

		[ot-text]
			{
			padding-left: 0.25em;
			}

		[ot-text] + [ot-img]
			{
			margin-right: -0.25rem;	
			}
		}
		
	.ot-as-menu &
		{ 
		padding: 0 0.5rem;
			
		height: 1.5rem;
		line-height: 1.5rem;
			
		border-top: 2px solid transparent;
		border-bottom: 2px solid transparent;
			
		&:hover
			{
			border-color: @element_hover_border;
			.background(@element_hover_bg);
				
			[ot-img].ot-img-set
				{
				background-position: 0 -16px;
				}
			}
			
		&:active
			{
			border-color: @element_active_border;
			.background(@element_active_bg);
				
			[ot-img].ot-img-set
				{
				background-position: 0 -32px;	
				}
			}
		}
	}

.ot-inspectorview-detail-options
	{	
	padding-bottom: 1rem;
	font-size: 0.875rem;
		
	line-height: 1.5rem;
	vertical-align: middle;
		
	*
		{
		vertical-align: middle;
		}
		
	& > *
		{
		margin-right: 2.25rem;
		display: inline-block;
		line-height: 1rem;
		}
	}

.ot-inspectorview-details
{
	box-sizing: border-box;
	width: 100%;
	padding: 1rem;

	.ot-touch-ui &
	 {
		 ot-metadata, ot-metadata:not([data-type="table"]):not([ot-table-cell]) { width: 100%; }
		}
	
	.ot-inspectorview-group-toggle
		{
		display: inline-block;
			
		& > :first-child
			{
			font-weight: bold;	
			}
			
		a
			{
			cursor: pointer;	
			}
		label
			{
			margin-right: 1rem;
			}
		}
	
	&:not([closed-groups])
		{
		.ot-inspectorview-group-toggle [open-all]
			{
			display: none;	
			}
		}
	
	&[closed-groups]
		{
		.ot-inspectorview-group-toggle [close-all]
			{
			display: none;	
			}
		}
	
	.ot-metadata-group-discloser-holder
		{
		padding-bottom: 1rem;
		display: inline-block;
		}
	
	.ot-metadata-group
		{
			width: 100%;
  		position: relative;
		}
	.ot-metadata-group:not(:last-child)
		{
		padding-bottom: 1rem;	
		}
	.ot-hide-block
		{
		display:none;
		}
	.ot-folder-path-block
		{
		.ot-folder-path-toggle
			{
			.ot-folder-path-title
				{
				padding-bottom: 1rem;
				}
			.ot-folder-Path-close
				{
				display: inline-block;
				vertical-align: top;
				width: 1rem;
				height: 1rem;
				background-image: url('../../style/img/tree_collapse10.png');
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;
				}
			.ot-folder-collapse
				{
				-webkit-transform: rotate(270deg);
				-moz-transform: rotate(270deg);
				-ms-transform: rotate(270deg);
				}
			.ot-folder-paths
				{
				padding-left: 1.2rem;
				.ot-folder-path-metadata
				{
				display: table-cell;
				width: 1px;
				white-space: nowrap;
				}
				.ot-folder-path-label
					{
					color: #333333;
					display: inline-block;
					font-size: 0.75rem;
					font-weight: bold;
					margin-bottom: 0.75rem;
					}
				.ot-folder-path-header
					{
					border-top: 1px solid #ccd9e1;
					border-bottom: 1px solid #ccd9e1;
					background-color: #f3f7f7;
					padding: 7px;
					.ot-folder-path-header-label
						{
						color: #333333;
						display: inline-block;
						font-size: 0.75rem;
						font-weight: bold;
						}
					}
				.ot-folder-path
					{
					color: #333333;
					font-size: 0.75rem;
					.ot-show-block
						{
						display: block;
						margin: 0.2rem;
						border-bottom: 1px solid #cccccc;
						}
					.ot-folder-label
						{
						margin: 0.2rem;
						font-weight: normal;
						cursor: text;
						}	
					}	
				}
			
			}
		}

	[ot-group-title]
	{
		font-size: 0.875rem;
		font-weight: bold;
		color: #333333;
		display: inline-block;
		vertical-align: top;
	}
	
	[ot-group-contents]
		{
		padding-left: 1.2rem;
		// This is going to sound crazy but we are using display: table-row and display: table-cell below this without setting this element to display: table, as amazingly it seems to provide the best
		//   of all worlds...
		//   change to responsive layout, abandon display: table, ART-31210
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		}

	ot-multilingual-metadata
	{
		display: table-row-group;
		
	ot-metadata
	{
			.ot-metadata-language
			{
				padding-left: 1rem;
				padding-right: 1rem;
				color: #666666;
				font-weight: normal;
				display: table-cell;
				width: 1px;
				white-space: nowrap;
				visibility: visible;
				
				.ot-mandatory-label
				{
					margin-left: 0.5rem;
				}
			}
		}
		
	}
	
	ot-metadata
	{
		
		&:not([data-type="table"]):not([ot-table-cell])
			{
			height: auto;
			line-height: 1.5rem;
			display: block;
			width: 41%;
		  float: left;
		  margin: 0 0 0 2rem;
			position: relative;
		  padding-left: 1.2rem;

			&[ot-not-in-preferred-metadata-locale]
			{
				display: none;
			}
	
			.ot-metadata-content
				{
					width: 70%;
				  word-wrap: break-word;
				  word-break: break-word;
				  float: left;
				  padding-left: 1rem;
				}
				
			&[editable][ot-edit-mode="edit"]
				{
				.ot-metadata-content
					{
					width: 66%;
					vertical-align: middle;
					&[ot-field-locked]::after
						{
						content: '';
						background-image: url("../../style/img/lock16.png");
						background-position: left center;
						background-repeat: no-repeat;
						vertical-align: middle;
						width: 16px;
						height: 16px;
						display: inline-block;
						}
					}
				}
				
			&:not(:last-child) > div
				{
				padding-bottom: 0.5rem;	
				}
			}
	
		&[data-type="table"]
		{
			overflow: hidden;
  		width: 100%;
			z-index: 9999;
			position: relative;
			background: #ffffff;
			
			.ot-metadata-label
			{ 
				text-align: left;
				padding-bottom: 0.8rem;
				width: 100%;
				
				label { margin-left: 0; }
			}
			
			.ot-metadata-table-container{ margin-top: -1rem; }
			.ot-metadata-table-row-entry ot-metadata{ color: #666666; }
			
			.ot-metadata-table-container
			{
				.ot-metadata-table-row-entry .table-cell-label
				{ 
					display: none; 
					height: 2.125rem;
				  color: @text_color;
				  font-size: 0.75rem;
				  font-weight: bold;
				  line-height: 2.125rem;
				  vertical-align: middle;
				  text-indent: 0.3rem;
					border-bottom: 1px solid ##e6e7e8;
				}
				
				.ot-metadata-table-row-entry .table-cell-label[ot-required]::after
				{
					content: '*';
				  color: @metadata_color_required;
				  font-weight: bold;
				  font-size: 0.75em;
				  vertical-align: super;
				  display: inline-block;
				}
				
				input[type="text"] { min-width: 89%; }
			}
		}
		
		&[data-type="table"]:not(:last-child)
			{
			padding-bottom: 0.5rem;	
			}
		
		label
		{
			font-size: 0.75rem;
			font-weight: bold;
			color: @text_color;
			display: inline-block;
			padding-right: 0.1rem;
			margin-left: -1rem;
		}
		
		.ot-metadata-label
			{
				width: 21%;
			  white-space: normal;
			  float: left;
			  text-align: right;
				position: relative;
				
				.ot-mandatory-label
					{
					color: @metadata_color_required;
					font-weight: bold;
					font-size: 0.75rem;
					position: absolute;
					}
			}
		
		.ot-metadata-language
			{
					visibility: hidden;
			}

		.ot-metadata-content
			{
			font-size: 0.75rem;
			color: @text_color;
			}
			
		&[data-edit-type="textarea"]
			{
			.ot-metadata-content
				{
				white-space: pre-wrap;
				}
			}
		
		.ot-display-block
		{
		display: block;
		}
		
		.ot-hide-block
		{
		display: none;
		}
		
		input
		{
			width: calc(~"100% - 1rem");
		}
		
		.ot-error-msg
		{
			display: table-cell;
			white-space: nowrap;
		}
		
		textarea {
			width: calc(~"100% - 0.6em");
			height: 4em;
		}
	}
	
	ot-multilingual-metadata:not(:last-child)
	{
		ot-metadata
		{
			&:not([data-type="table"]):not([ot-table-cell])
			{
				&:last-child > div
				{
					padding-bottom: 0.5rem;	
				}
			}
		}
	}
}

ot-multilingual-metadata > ot-metadata:not([default-language])
{
	&:not([ot-required="true"])
	{
		.ot-metadata-label
		{
			visibility: hidden;
		}
		
		.ot-metadata-label.ot-force-visible
		{
			visibility: visible;
		}
	}
	
	&[ot-required="true"]
	{
		.ot-metadata-label > label
		{
			visibility: hidden;
		}
		
		.ot-metadata-label.ot-force-visible > label
		{
			visibility: visible;
		}
	}
}

.ot-inspector-security-details
	{
	padding: 1rem 2.5rem;
	}

.ot-inspector-security-details-title
	{
	font-weight: bold;
	padding-bottom: 0.5rem;
	}

.ot-security-policy
	{
	padding: 1rem;
		
	.background(@security_policy_bg);
	border: 1px solid @security_policy_border;
		
	font-size: 0.875rem;
		
	.ot-security-policy-header
		{
		min-height: 1rem;
		line-height: 1rem;
			
		& > *
			{
			vertical-align: middle;
			}
		}
        
    .ot-security-policy-details
        {
            margin-top: 1rem;
            
            &.hidden{
            	display: none;
            }
        }
		
	.ot-security-policy-name
		{
		font-weight: bold;
		max-width: 80%;
		font-size: 0.875rem;
		word-wrap: break-word;
		display: inline-block;
		}
		
	ot-metadata[ot-fields="preferred"]
		{
		display: inline-block;
		height: 1rem;
		width: 1rem;
		
		background-repeat: no-repeat;
		background-position: center center;
		margin-left: 0.5rem;
			
		&[data-value="true"]
			{
			background-image: url('../../style/img/preferred_policy16.png');	
			}
		}
		
	.ot-security-policy-description
		{
		padding-top: 0.5rem;
		word-wrap: break-word;
		}
		
	&:not(:last-child)
		{
		margin-bottom: 1rem;
		}
	}

.ot-inspector-relationship-dropdown-wrapper	
	{
	& > *
		{
		vertical-align: middle;	
		}
		
	.ot-inspector-relationship-dropdown-text
		{
		display: inline-block;
		padding-right: 1rem;
		font-size: 0.875rem;
		}
		
	&:not(.show)
		{
		visibility: hidden;
		}
	}
	
ot-view[ot-view-type="SecurityDetailsDialogView"]
{
	height: 600px;
	max-width: calc(~"100% - 0.2rem");
	
	.ot-touch-ui &
	{
		width: calc(~"100% - 0.5rem");
		height: calc(~"100% - 0.5rem");
		max-width: 100%;
	}
	
	.ot-modal-dialog-footer
	{
		display: none;
	}
	
	.ot-modal-dialog-body
	{	
		height: calc(~"100% - 5.75rem - 2px");
	
		.ot-table-content
		{
			width: 100%;
			height: 100%;
			overflow-x: auto;
			overflow-y: auto;
			
			& > .ot-table-header
			{
				display: inline-block;
				height: 60px;
				line-height: 3rem;
				width: 100%;
				border: 0px solid #dcdcdc;

				& > .ot-table-heading
				{
					font-size: 0.75rem;
					text-indent: 0;
					padding: 16px 0.25rem;
					width: 4.5rem;
					white-space: normal;
				  	height: 60px;
				  	line-height: 0.875rem;
					text-align: center;
					color: #333333;
					border: 1px solid #dcdcdc;
					background-color: #f5f5f5;
					
					& > ot-i18n
					{
						word-break: break-word;
					}
				}
				
				& > .ot-table-heading:first-child{ border-left: 0px solid #dcdcdc; }
				& > .ot-table-heading:last-child{ border-right: 0px solid #dcdcdc; }
			}
			
			
			& > .ot-table-allrows
			{
				height: calc(~"100% - 4rem");
				width: 100%;
				overflow-y: visible;
				overflow-x: visible;				
				
				& > .ot-table-row
				{
					//display: inline-block;
					border-bottom-color: #dddddd;
					
					& > .ot-table-element
					{
						height: 2.25rem;
						width: 4.5rem;
						font-size: 0.75rem;
						color: #333333;
						
						&.ot-policy-permission
						{
							background-image: url('../../style/img/checkmark16.png');
							background-repeat: no-repeat;
							background-position: center;
							
						}
					}
				}
			}
		}
		
		& > div
		{
			margin: 1rem;
		}
	}
}

div[otui-tabname="AssetReviewsView"]
{	
	.ot-table-content
	{
		width: 100%;
		height: 100%;
		
		.ot-table-allrows
		{
			width: 100%;
			height: calc(~"100% - 40px");
			
			.ot-table-row
			{
				.ot-review-image
				{
					cursor: pointer;
				}
				
				a
				{
				text-decoration: none;
				font-size: 0.813rem;
				
				&:not([disabled])
					{
					cursor: pointer;
					color: @titlecolor;
					font-weight: bold;
					}
					
				&[disabled]
					{
					color: @textcolor;
					}
				}
	
				.ot-table-element
				{
					vertical-align: middle;
					word-break: break-word;
				}
			}
		}
	}		
}


div[otui-tabname="AssetAuditView"]
{	
	.ot-assetaudit-wrapper
	{
		display: inline-block;
		padding: 1.5rem 1rem 1rem 1rem;
		width: calc(~"100% - 2rem");
		height: calc(~"100% - 3rem");
		
	}
	
	.ot-assetaudit-wrapper > .ot-table-content > .slimScrollDiv > .ot-table-allrows > .ot-table-row > .ot-table-element
  	{
  		font-size: 0.75rem;
  	}
  
	.ot-assetaudit-wrapper > .ot-table-content > .ot-table-allrows > .ot-table-row > .ot-table-element
  	{
		font-size: 0.75rem;
  	}
  	
	.ot-assetaudit-wrapper > .ot-table-content > .ot-table-allrows > .ot-table-row > .ot-assetaudit-type-element > .ot-table-element
  	{
		font-size: 0.75rem;
  	}
  	
	.ot-assetaudit-wrapper > .ot-table-content > .slimScrollDiv > .ot-table-allrows > .ot-table-row > .ot-assetaudit-type-element > .ot-table-element
  	{
    	font-size: 0.75rem;
	}
	
	
	.ot-assetaudit-header > .ot-assetaudit-title
	{
		color: @titlecolor;
		height:	1.25rem;
		font-weight: normal;
		font-size: 1.25rem;
		height: 2.5rem;
	}
	
	
	.ot-assetaudit-filter-head
	{
		background-color: #f5f5f5;
		border-top: 1px solid #dcdcdc;
	}
	
	.ot-assetaudit-filter-body
	{
		height: 2.75rem;
		background: #f5f5f5;
		padding-left: 0.39rem;
		display: table-cell;
		vertical-align: middle;
		margin-top: 10px;
		
		.ot-filter-data > .ot-drop-down
		{
			&[ot-as-multiselect]
			{
				width: 16rem;
			}
		}
	}
	
	.ot-filter-data
	{
		display: inline-block;
	}
	
	.ot-assetaudit-filter-label
	{
		display: inline-block;
		vertical-align: top;
		margin-top: 8px;
	}
	
	.ot-assetaudit-body-content
	{
		width:calc(~"100% - 0.125rem");
		height: calc(~"100% - 7.6rem");
		.ot-touch-ui &
		{
			height: calc(~"100% - 5rem");
		}
	}
	
	
	[ot-device-platform="desktop"] .ot-assetaudit-all-table-rows
	{
		height: 100% !important;
	}

	[ot-device-platform="tablet"] .ot-assetaudit-all-table-rows
	{
		height: calc(~"100% - 2.125rem") !important;
	}
	
	[ot-device-platform="tablet"] .ot-audits-ipad-scroll
	{
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
	}
	
	.ot-table-allrows > .ot-table-empty-audits-label
	{
		top:8rem; 
	}
	
	.ot-assetaudit-row
	{
		border-style: solid;
		border-width: 0.0625rem 0 0.0625rem 0;
		border-color: rgba(0, 0, 0, 0);
		cursor: pointer;
		color: #333333;
		line-height: 1.25rem;
		border-bottom: 0.0625rem solid #dcdcdc;
	}
}

ot-view[ot-view-type="FolderResultsView"] ot-view-collapser[collapser-style="pagination"] .ot-carousel-header-hover {
	top: 0;
	z-index: 10;
	opacity: 0.9;
}

@media screen and (max-width: 1024px)
{
	.ot-inspectorview-details ot-metadata:not([data-type="table"]):not([ot-table-cell]){
		padding-left: 1.2rem;
	  margin: 0rem;
	  width: 100%;
		
		.ot-metadata-label{
			width: 21%;
  		text-align: right;
		}
		.ot-metadata-content{
			margin-left: 0rem;
  		padding-left: 1.2rem;
		  width: 70%;
		}
	}
	
	.ot-inspectorview-details ot-metadata[data-type="table"]{
		
		.ot-metadata-table-header{ display: table-header-group; }
		.ot-metadata-table-row{
			display: table-row;
  		border: 0px solid rgb(220, 220, 220);
			
			.ot-metadata-table-row-entry{
				display: table-cell;
  			border-top: 0px solid rgb(220, 220, 220);
				.table-cell-label{display: none;}
			}
		}
	}
}
